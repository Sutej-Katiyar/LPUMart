/* ================= SUPABASE ADMIN DASHBOARD ================= */

const table = document.getElementById("productTable");
const emptyState = document.getElementById("emptyState");
const searchInput = document.getElementById("searchInput");

const modalOverlay = document.getElementById("modalOverlay");
const productForm = document.getElementById("productForm");

const addProductBtn = document.getElementById("addProductBtn");
const closeModalBtn = document.getElementById("closeModal");
const cancelBtn = document.getElementById("cancelBtn");
const logoutBtn = document.getElementById("logoutBtn");

const productImageInput = document.getElementById("productImage");
const imagePreviewWrap = document.getElementById("imagePreviewWrap");
const imagePreview = document.getElementById("imagePreview");
const removeImageBtn = document.getElementById("removeImageBtn");

let products = [];
let existingImageUrl = "";
let removeExistingImage = false;
let currentAdminMode = getMarketplaceMode();

/* ================= HELPERS ================= */

function formatPrice(price) {
    return "₹" + Number(price || 0).toLocaleString("en-IN");
}

function escapeHtml(value) {
    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function getStoragePathFromUrl(url) {
    if (!url) return null;

    const marker = "/storage/v1/object/public/product-images/";
    const index = url.indexOf(marker);

    if (index === -1) return null;

    return decodeURIComponent(url.substring(index + marker.length));
}

function resetImageUI() {
    existingImageUrl = "";
    removeExistingImage = false;

    if (productImageInput) {
        productImageInput.value = "";
    }

    if (imagePreview) {
        imagePreview.removeAttribute("src");
    }

    if (imagePreviewWrap) {
        imagePreviewWrap.classList.remove("show");
    }
}

function showImagePreview(url) {
    if (!imagePreview || !imagePreviewWrap) return;

    if (!url) {
        imagePreview.removeAttribute("src");
        imagePreviewWrap.classList.remove("show");
        return;
    }

    imagePreview.src = url;
    imagePreviewWrap.classList.add("show");
}

async function uploadProductImage(file) {
    if (!file) return null;

    if (!file.type.startsWith("image/")) {
        throw new Error("Please select an image file.");
    }

    if (file.size > 5 * 1024 * 1024) {
        throw new Error("Image must be 5 MB or smaller.");
    }

    const extension = (file.name.split(".").pop() || "jpg")
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "");

    const filePath = `products/${crypto.randomUUID()}.${extension}`;

    const { data, error } = await supabaseClient.storage
        .from("product-images")
        .upload(filePath, file, {
            contentType: file.type,
            cacheControl: "3600",
            upsert: false
        });

    if (error) {
        throw error;
    }

    const { data: publicData } = supabaseClient.storage
        .from("product-images")
        .getPublicUrl(data.path);

    return publicData.publicUrl;
}

async function deleteProductImage(url) {
    const path = getStoragePathFromUrl(url);

    if (!path) return;

    const { error } = await supabaseClient.storage
        .from("product-images")
        .remove([path]);

    if (error) {
        console.warn("Could not remove old product image:", error);
    }
}

/* ================= AUTH ================= */

async function checkAdminSession() {
    const { data, error } = await supabaseClient.auth.getSession();

    if (error || !data.session) {
        window.location.replace("admin-login.html");
        return false;
    }

    return true;
}

/* ================= DATABASE ================= */

async function loadProducts() {
    if (!table) return;

    table.innerHTML = `
        <tr>
            <td colspan="5" class="loading-cell">Loading products...</td>
        </tr>
    `;

    const { data, error } = await supabaseClient
        .from("products")
        .select("*")
        .eq("marketplace_mode", currentAdminMode)
        .order("created_at", { ascending: false });

    if (error) {
        console.error(error);
        table.innerHTML = `
            <tr>
                <td colspan="5" class="loading-cell">
                    Could not load products. ${escapeHtml(error.message)}
                </td>
            </tr>
        `;
        return;
    }

    products = Array.isArray(data) ? data : [];
    renderProducts(searchInput ? searchInput.value : "");
}

async function saveProduct(productId, productData, newImageFile) {
    let finalImageUrl = existingImageUrl;

    if (removeExistingImage) {
        finalImageUrl = "";
    }

    if (newImageFile) {
        finalImageUrl = await uploadProductImage(newImageFile);
    }

    const dataToSave = {
        ...productData,
        marketplace_mode: productData.marketplace_mode || currentAdminMode,
        image_url: finalImageUrl || null
    };

    if (productId) {
        const oldProduct = products.find(
            item => String(item.id) === String(productId)
        );

        const { error } = await supabaseClient
            .from("products")
            .update(dataToSave)
            .eq("id", productId);

        if (error) {
            // If a new image was uploaded but the DB update failed, remove
            // the newly uploaded image so Storage does not accumulate junk.
            if (newImageFile && finalImageUrl) {
                await deleteProductImage(finalImageUrl);
            }
            throw error;
        }

        // Remove the old file only after the database update succeeds.
        if (
            oldProduct?.image_url &&
            oldProduct.image_url !== finalImageUrl
        ) {
            await deleteProductImage(oldProduct.image_url);
        }
    } else {
        const { error } = await supabaseClient
            .from("products")
            .insert(dataToSave);

        if (error) {
            if (newImageFile && finalImageUrl) {
                await deleteProductImage(finalImageUrl);
            }
            throw error;
        }
    }

    await loadProducts();
}

async function deleteProductFromDatabase(id) {
    const product = products.find(
        item => String(item.id) === String(id)
    );

    const { error } = await supabaseClient
        .from("products")
        .delete()
        .eq("id", id);

    if (error) {
        throw error;
    }

    if (product?.image_url) {
        await deleteProductImage(product.image_url);
    }

    await loadProducts();
}

/* ================= RENDER ================= */

function renderProducts(filter = "") {
    if (!table) return;

    const search = String(filter).toLowerCase().trim();

    const filteredProducts = products.filter(product => {
        const name = String(product.name || "").toLowerCase();
        const category = String(product.category || "").toLowerCase();

        return name.includes(search) || category.includes(search);
    });

    table.innerHTML = "";

    filteredProducts.forEach(product => {
        const row = document.createElement("tr");
        const stock = Number(product.stock) || 0;
        const stockClass = stock <= 10 ? "stock-low" : "stock-good";

        const productVisual = product.image_url
            ? `<img class="table-product-image" src="${escapeHtml(product.image_url)}" alt="${escapeHtml(product.name)}">`
            : `<div class="table-product-placeholder">🛍️</div>`;

        row.innerHTML = `
            <td>
                <div class="admin-product-cell">
                    ${productVisual}
                    <div>
                        <div class="product-name">${escapeHtml(product.name)}</div>
                        <div class="product-description">${escapeHtml(product.description)}</div>
                    </div>
                </div>
            </td>
            <td>${escapeHtml(product.category)}</td>
            <td class="price-cell">${formatPrice(product.price)}</td>
            <td class="${stockClass}">${stock}</td>
            <td>
                <button type="button"
                        class="action-btn edit-btn"
                        data-action="edit"
                        data-id="${escapeHtml(product.id)}">
                    Edit
                </button>
                <button type="button"
                        class="action-btn delete-btn"
                        data-action="delete"
                        data-id="${escapeHtml(product.id)}">
                    Delete
                </button>
            </td>
        `;

        table.appendChild(row);
    });

    if (emptyState) {
        emptyState.style.display =
            filteredProducts.length === 0 ? "block" : "none";
    }

    updateStats();
}

function updateStats() {
    const totalProducts = document.getElementById("totalProducts");
    const averagePrice = document.getElementById("averagePrice");
    const totalCategories = document.getElementById("totalCategories");

    if (totalProducts) {
        totalProducts.textContent = products.length;
    }

    const average = products.length
        ? products.reduce((sum, product) => {
              return sum + (Number(product.price) || 0);
          }, 0) / products.length
        : 0;

    if (averagePrice) {
        averagePrice.textContent = formatPrice(Math.round(average));
    }

    if (totalCategories) {
        totalCategories.textContent = new Set(products.map(product => product.category)).size;
    }
    const low = document.getElementById("lowStockCount");
    const top = document.getElementById("topRatedCount");
    const disc = document.getElementById("discountedCount");
    if (low) low.textContent = products.filter(p => Number(p.stock) <= 10).length;
    if (top) top.textContent = products.filter(p => Number(p.rating || 0) >= 4.5).length;
    if (disc) disc.textContent = products.filter(p => p.old_price && Number(p.old_price) > Number(p.price)).length;
}

/* ================= MARKETPLACE MODE ================= */

function updateAdminModeUI() {
    const config = MARKETPLACE_MODES[currentAdminMode];

    document.querySelectorAll("[data-admin-mode]").forEach(button => {
        const active = button.dataset.adminMode === currentAdminMode;
        button.classList.toggle("active", active);
        button.setAttribute("aria-pressed", active ? "true" : "false");
    });

    const title = document.getElementById("adminModeTitle");
    const description = document.getElementById("adminModeDescription");

    if (title) title.textContent = config.label;
    if (description) description.textContent = config.description;

    const empty = document.querySelector("#emptyState h3");
    if (empty) empty.textContent = `No ${config.label.toLowerCase()} products found`;

    const modeSelect = document.getElementById("productMode");
    if (modeSelect && !document.getElementById("productId").value) {
        modeSelect.value = currentAdminMode;
    }
}

function updateCategoryOptions(mode, selectedCategory = "") {
    const select = document.getElementById("productCategory");
    if (!select) return;

    const config = MARKETPLACE_MODES[mode] || MARKETPLACE_MODES.normal;
    select.innerHTML = '<option value="">Select category</option>' +
        config.categories.map(category =>
            `<option value="${escapeHtml(category)}">${escapeHtml(category)}</option>`
        ).join("");

    if (selectedCategory && config.categories.includes(selectedCategory)) {
        select.value = selectedCategory;
    }
}

const adminModeButtons = document.querySelectorAll("[data-admin-mode]");
adminModeButtons.forEach(button => {
    button.addEventListener("click", async () => {
        currentAdminMode = button.dataset.adminMode;
        setMarketplaceMode(currentAdminMode);
        updateAdminModeUI();
        updateCategoryOptions(currentAdminMode);
        await loadProducts();
    });
});

const productModeSelect = document.getElementById("productMode");
if (productModeSelect) {
    productModeSelect.addEventListener("change", () => {
        updateCategoryOptions(productModeSelect.value);
    });
}

updateAdminModeUI();
updateCategoryOptions(currentAdminMode);

/* ================= MODAL ================= */

function openModal(product = null) {
    if (!modalOverlay || !productForm) return;

    const modalTitle = document.getElementById("modalTitle");
    const saveProductBtn = document.getElementById("saveProductBtn");

    modalOverlay.classList.add("show");
    resetImageUI();

    if (product) {
        modalTitle.textContent = "Edit Product";
        saveProductBtn.textContent = "Save Changes";

        document.getElementById("productId").value = product.id;
        document.getElementById("productName").value = product.name || "";
        document.getElementById("productMode").value = product.marketplace_mode || currentAdminMode;
        updateCategoryOptions(product.marketplace_mode || currentAdminMode, product.category || "");
        document.getElementById("productPrice").value = product.price ?? "";
        document.getElementById("productOldPrice").value = product.old_price ?? "";
        document.getElementById("productRating").value = product.rating ?? 4.5;
        document.getElementById("productReviewCount").value = product.review_count ?? 0;
        document.getElementById("productBadge").value = product.badge || "";
        document.getElementById("productDelivery").value = product.delivery_text || "Free delivery on eligible orders";
        document.getElementById("productStock").value = product.stock ?? "";
        document.getElementById("productDescription").value =
            product.description || "";

        existingImageUrl = product.image_url || "";
        showImagePreview(existingImageUrl);
    } else {
        modalTitle.textContent = "Add Product";
        saveProductBtn.textContent = "Add Product";

        productForm.reset();
        document.getElementById("productId").value = "";
        document.getElementById("productMode").value = currentAdminMode;
        updateCategoryOptions(currentAdminMode);
        resetImageUI();
    }

    document.getElementById("productName").focus();
}

function closeModal() {
    if (modalOverlay) {
        modalOverlay.classList.remove("show");
    }
}

if (addProductBtn) {
    addProductBtn.addEventListener("click", () => openModal());
}

if (closeModalBtn) {
    closeModalBtn.addEventListener("click", closeModal);
}

if (cancelBtn) {
    cancelBtn.addEventListener("click", closeModal);
}

if (modalOverlay) {
    modalOverlay.addEventListener("click", event => {
        if (event.target === modalOverlay) {
            closeModal();
        }
    });
}

/* ================= IMAGE INPUT ================= */

if (productImageInput) {
    productImageInput.addEventListener("change", () => {
        const file = productImageInput.files?.[0];

        if (!file) {
            if (existingImageUrl && !removeExistingImage) {
                showImagePreview(existingImageUrl);
            }
            return;
        }

        if (!file.type.startsWith("image/")) {
            alert("Please select an image file.");
            productImageInput.value = "";
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            alert("Image must be 5 MB or smaller.");
            productImageInput.value = "";
            return;
        }

        removeExistingImage = false;
        showImagePreview(URL.createObjectURL(file));
    });
}

if (removeImageBtn) {
    removeImageBtn.addEventListener("click", () => {
        removeExistingImage = true;
        existingImageUrl = "";
        if (productImageInput) productImageInput.value = "";
        showImagePreview("");
    });
}

/* ================= ADD / EDIT ================= */

if (productForm) {
    productForm.addEventListener("submit", async event => {
        event.preventDefault();

        const saveButton = document.getElementById("saveProductBtn");
        const productId = document.getElementById("productId").value;

        const name = document.getElementById("productName").value.trim();
        const marketplace_mode = document.getElementById("productMode").value;
        const category = document.getElementById("productCategory").value.trim();
        const price = Number(document.getElementById("productPrice").value);
        const old_price_raw = document.getElementById("productOldPrice").value;
        const old_price = old_price_raw === "" ? null : Number(old_price_raw);
        const rating = Number(document.getElementById("productRating").value || 4.5);
        const review_count = Number(document.getElementById("productReviewCount").value || 0);
        const badge = document.getElementById("productBadge").value.trim() || null;
        const delivery_text = document.getElementById("productDelivery").value.trim() || "Free delivery on eligible orders";
        const stock = Number(document.getElementById("productStock").value);
        const description =
            document.getElementById("productDescription").value.trim();
        const imageFile = productImageInput?.files?.[0] || null;

        if (
            !name ||
            !category ||
            !description ||
            Number.isNaN(price) ||
            price < 0 ||
            Number.isNaN(stock) ||
            stock < 0 ||
            (old_price !== null && (Number.isNaN(old_price) || old_price < 0)) ||
            Number.isNaN(rating) || rating < 0 || rating > 5 ||
            Number.isNaN(review_count) || review_count < 0
        ) {
            alert("Please fill in all fields correctly.");
            return;
        }

        const productData = {
            name,
            marketplace_mode,
            category,
            price,
            old_price,
            rating,
            review_count,
            badge,
            delivery_text,
            stock,
            description
        };

        saveButton.disabled = true;
        saveButton.textContent = productId ? "Saving..." : "Adding...";

        try {
            await saveProduct(productId, productData, imageFile);
            closeModal();
        } catch (error) {
            console.error(error);
            alert("Could not save the product: " + error.message);
        } finally {
            saveButton.disabled = false;
            saveButton.textContent = productId ? "Save Changes" : "Add Product";
        }
    });
}

/* ================= EDIT / DELETE BUTTONS ================= */

if (table) {
    table.addEventListener("click", async event => {
        const button = event.target.closest("button[data-action]");
        if (!button) return;

        const id = button.dataset.id;
        const action = button.dataset.action;

        if (action === "edit") {
            const product = products.find(
                item => String(item.id) === String(id)
            );

            if (product) {
                openModal(product);
            }
        }

        if (action === "delete") {
            const product = products.find(
                item => String(item.id) === String(id)
            );

            if (!product) return;

            if (!confirm(`Are you sure you want to delete "${product.name}"?`)) {
                return;
            }

            try {
                await deleteProductFromDatabase(id);
            } catch (error) {
                console.error(error);
                alert("Could not delete the product: " + error.message);
            }
        }
    });
}

/* ================= SEARCH ================= */

if (searchInput) {
    searchInput.addEventListener("input", () => {
        renderProducts(searchInput.value);
    });
}

/* ================= LOGOUT ================= */

if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
        await supabaseClient.auth.signOut();
        window.location.replace("admin-login.html");
    });
}

/* ================= DARK MODE ================= */

function setTheme(theme) {
    const isDark = theme === "dark";

    document.documentElement.classList.toggle("dark-mode", isDark);
    document.body.classList.toggle("dark-mode", isDark);

    if (themeIcon) {
        themeIcon.textContent = isDark ? "☾" : "☀";
    }

    if (themeToggle) {
        themeToggle.setAttribute(
            "aria-label",
            isDark ? "Switch to light mode" : "Switch to dark mode"
        );
        themeToggle.title =
            isDark ? "Switch to light mode" : "Switch to dark mode";
    }

    localStorage.setItem("adminTheme", isDark ? "dark" : "light");
}

if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        const isDark =
            document.body.classList.contains("dark-mode") ||
            document.documentElement.classList.contains("dark-mode");

        setTheme(isDark ? "light" : "dark");
    });

    // Respect the theme applied by the anti-flicker bootstrap.
    const initialTheme =
        document.documentElement.classList.contains("dark-mode")
            ? "dark"
            : "light";

    setTheme(initialTheme);
}

/* ================= INITIAL LOAD ================= */

(async function init() {
    const authenticated = await checkAdminSession();

    if (!authenticated) return;

    await loadProducts();
})();
