async function getProducts() {
  const { data, error } = await supabaseClient.from('products').select('*').eq('marketplace_mode', getMarketplaceMode()).order('created_at',{ascending:false});
  if(error){ console.error(error); return []; }
  return data || [];
}
function formatPrice(price){ return '₹'+Number(price||0).toLocaleString('en-IN'); }
function escapeHtml(value){ return String(value??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#039;'); }
const PRODUCT_IMAGES={47:'assets/products/47.svg',16:'assets/products/16.svg',22:'assets/products/22.svg',31:'assets/products/31.svg',39:'assets/products/39.svg',43:'assets/products/43.svg',52:'assets/products/52.svg',54:'assets/products/54.svg',63:'assets/products/63.svg',76:'assets/products/76.svg',77:'assets/products/77.svg',82:'assets/products/82.svg',87:'assets/products/87.svg',89:'assets/products/89.svg',95:'assets/products/95.svg',99:'assets/products/99.svg',101:'assets/products/101.svg',109:'assets/products/109.svg'};
function productImageUrl(product){
  // Admin-uploaded Supabase Storage images must take priority over bundled defaults.
  if (product?.image_url) {
    const separator = product.image_url.includes('?') ? '&' : '?';
    const version = product.updated_at || Date.now();
    return product.image_url + separator + 'v=' + encodeURIComponent(version) + '&cb=' + encodeURIComponent(String(product.id));
  }
  return PRODUCT_IMAGES[String(product?.id)] || 'assets/products/1.svg';
}
function productIcon(category){ const icons={Electronics:'📱',Fashion:'👟','Home & Living':'🏠',Beauty:'💄',Sports:'⚽',Books:'📚','Fruits & Vegetables':'🥦',Dairy:'🥛',Bakery:'🥖',Staples:'🌾',Snacks:'🍿',Beverages:'🥤',Household:'🧹',Medicines:'💊','Personal Care':'🧴','Vitamins & Supplements':'💚','First Aid':'🩹','Baby Care':'🍼','Medical Devices':'🩺'}; return icons[category]||'🛍️'; }
async function currentUser(){ const {data:{session}}=await supabaseClient.auth.getSession(); return session?.user||null; }
async function addToCart(productId){ const u=await currentUser(); if(!u){ location.href='auth.html?next='+encodeURIComponent(location.pathname.split('/').pop()+(location.search||'')); return false; } const {data:old,error:findError}=await supabaseClient.from('cart_items').select('id,quantity').eq('user_id',u.id).eq('product_id',productId).maybeSingle(); if(findError){showToast(findError.message);return false;} let error;if(old){({error}=await supabaseClient.from('cart_items').update({quantity:Number(old.quantity)+1,updated_at:new Date().toISOString()}).eq('id',old.id));}else{({error}=await supabaseClient.from('cart_items').insert({user_id:u.id,product_id:productId,quantity:1}));} if(error){showToast(error.message);return false;} showToast('Added to cart ✓'); updateCartBadge(); if(window.openFloatingCart) window.openFloatingCart(true); return true; }
async function toggleWishlist(productId){ const u=await currentUser(); if(!u){location.href='auth.html?next='+encodeURIComponent(location.pathname.split('/').pop()+(location.search||''));return false;} const {data:old,error:findError}=await supabaseClient.from('wishlist_items').select('id').eq('user_id',u.id).eq('product_id',productId).maybeSingle(); if(findError){showToast(findError.message);return false;} if(old){const {error}=await supabaseClient.from('wishlist_items').delete().eq('id',old.id);if(error){showToast(error.message);return false;}showToast('Removed from wishlist');return false;} const {error}=await supabaseClient.from('wishlist_items').insert({user_id:u.id,product_id:productId});if(error){showToast(error.message);return false;}showToast('Added to wishlist ♥');return true; }
async function recordView(productId){ const u=await currentUser(); if(u) await supabaseClient.from('recently_viewed').upsert({user_id:u.id,product_id:productId,viewed_at:new Date().toISOString()},{onConflict:'user_id,product_id'}); }
function showToast(msg){ let t=document.getElementById('siteToast');if(!t){t=document.createElement('div');t.id='siteToast';t.className='site-toast';document.body.appendChild(t);}t.textContent=msg;t.classList.add('show');clearTimeout(window.__toast);window.__toast=setTimeout(()=>t.classList.remove('show'),1800); }
async function handleCartClick(productId,button){if(button.disabled)return;button.disabled=true;const ok=await addToCart(productId);if(ok){button.textContent='✓';button.classList.add('added');setTimeout(()=>{button.disabled=false;button.textContent='🛒';button.classList.remove('added');},1200);}else button.disabled=false;}
async function handleWishClick(productId,button){const added=await toggleWishlist(productId);if(added===false && button.classList.contains('active')){button.classList.remove('active');button.textContent='♡';}else if(added===true){button.classList.add('active');button.textContent='♥';}}
async function loadWishlistState(){const u=await currentUser();if(!u)return;const {data}=await supabaseClient.from('wishlist_items').select('product_id').eq('user_id',u.id);const ids=new Set((data||[]).map(x=>x.product_id));document.querySelectorAll('[data-wish-product]').forEach(b=>{if(ids.has(Number(b.dataset.wishProduct))){b.classList.add('active');b.textContent='♥';}});}
async function updateCartBadge(){const u=await currentUser();const badges=document.querySelectorAll('[data-cart-count]');if(!u){badges.forEach(b=>b.textContent='0');return;}const {data}=await supabaseClient.from('cart_items').select('quantity').eq('user_id',u.id);const count=(data||[]).reduce((s,x)=>s+Number(x.quantity||0),0);badges.forEach(b=>b.textContent=count);}
async function renderPublicProducts(filter=''){
 const grid=document.getElementById('productsGrid');const empty=document.getElementById('productsEmpty');if(!grid)return;
 const search=String(filter).toLowerCase().trim();let products=await getProducts();
 const cat=document.getElementById('categoryFilter')?.value||new URLSearchParams(location.search).get('category')||'';const sort=document.getElementById('sortFilter')?.value||'featured';
 products=products.filter(p=>!search||[p.name,p.category,p.brand,p.description].some(v=>String(v||'').toLowerCase().includes(search)));if(cat)products=products.filter(p=>p.category===cat);
 if(sort==='price-low')products.sort((a,b)=>Number(a.price)-Number(b.price));if(sort==='price-high')products.sort((a,b)=>Number(b.price)-Number(a.price));if(sort==='rating')products.sort((a,b)=>Number(b.rating)-Number(a.rating));
 const cf=document.getElementById('categoryFilter');if(cf&&cf.options.length===1){[...new Set((await getProducts()).map(p=>p.category))].sort().forEach(c=>cf.insertAdjacentHTML('beforeend',`<option value="${escapeHtml(c)}">${escapeHtml(c)}</option>`));if(cat)cf.value=cat;}
 grid.innerHTML=products.map(p=>`<article class="market-card" data-product-id="${p.id}" role="link" tabindex="0"><div class="product-img"><img src="${productImageUrl(p)}" alt="${escapeHtml(p.name)}" loading="lazy"></div><div class="product-card-body"><span class="badge">${escapeHtml(p.badge||'Featured')}</span><small>${escapeHtml(p.brand||'LPUMart')}</small><h3>${escapeHtml(p.name)}</h3><div class="stars">★★★★★ <span>${Number(p.rating||4.5).toFixed(1)} (${Number(p.review_count||0).toLocaleString('en-IN')})</span></div><p>${escapeHtml(p.description)}</p><div><strong class="price">${formatPrice(p.price)}</strong> ${p.old_price?`<del>${formatPrice(p.old_price)}</del>`:''}</div><p class="delivery">✓ ${escapeHtml(p.delivery_text||'Free delivery on eligible orders')}</p><div class="product-actions-public"><button class="product-btn" onclick="location.href='product.html?id=${p.id}'">View Product</button><button class="save-btn" data-wish-product="${p.id}" onclick="handleWishClick(${p.id},this)">♡</button><button class="cart-btn" ${Number(p.stock)<=0?'disabled':''} data-cart-product="${p.id}" onclick="handleCartClick(${p.id},this)">🛒</button></div></div></article>`).join('');
 if(empty)empty.style.display=products.length?'none':'block';loadWishlistState();updateCartBadge();
}
const publicSearch=document.getElementById('productSearch');if(publicSearch)publicSearch.addEventListener('input',()=>renderPublicProducts(publicSearch.value));
const categoryFilter=document.getElementById('categoryFilter');if(categoryFilter)categoryFilter.addEventListener('change',()=>renderPublicProducts(publicSearch?.value||''));
const sortFilter=document.getElementById('sortFilter');if(sortFilter)sortFilter.addEventListener('change',()=>renderPublicProducts(publicSearch?.value||''));
const themeToggle=document.getElementById('themeToggle'),themeIcon=document.getElementById('themeIcon');
function setPublicTheme(theme){const dark=theme==='dark';document.documentElement.classList.toggle('dark-mode',dark);document.body.classList.toggle('dark-mode',dark);if(themeIcon)themeIcon.textContent=dark?'☾':'☀';if(themeToggle){themeToggle.title=dark?'Switch to light mode':'Switch to dark mode';themeToggle.setAttribute('aria-label',themeToggle.title);}localStorage.setItem('marketplaceTheme',dark?'dark':'light');}
if(themeToggle){themeToggle.addEventListener('click',()=>setPublicTheme(document.documentElement.classList.contains('dark-mode')?'light':'dark'));setPublicTheme(document.documentElement.classList.contains('dark-mode')?'dark':'light');}

// Open a product by clicking anywhere on its card, while preserving action buttons/links.
document.addEventListener("click", function(event){
  const card = event.target.closest(".market-card, .deal-card, .recommend-card");
  if(!card) return;
  if(event.target.closest("button, a, input, select, textarea, label")) return;
  const id = card.dataset.productId || card.getAttribute("data-product-id");
  if(id) window.location.href = "product.html?id=" + encodeURIComponent(id);
});

window.addEventListener("marketplaceModeChanged",()=>{
  // Update only the affected UI sections; never reload the document.
  applyMarketplaceMode();
  if(publicSearch) publicSearch.value="";
  const cf=document.getElementById("categoryFilter");
  if(cf) cf.innerHTML='<option value="">All categories</option>';
  requestAnimationFrame(()=>{
    if(typeof renderPublicProducts==="function" && document.getElementById("productsGrid")) renderPublicProducts();
    if(typeof renderHome==="function") renderHome();
    if(typeof renderCategories==="function" && document.getElementById("categoriesGrid")) renderCategories();
  });
});
async function updateAuthButton(){const b=document.getElementById('authButton');if(!b)return;const u=await currentUser();if(!u){b.textContent='Login';b.onclick=()=>location.href='auth.html';b.classList.remove('user-account');}else{const name=u.user_metadata?.full_name||u.user_metadata?.name||u.email?.split('@')[0]||'User';b.textContent='👤 '+(name.length>22?name.slice(0,20)+'…':name);b.onclick=()=>location.href='account.html';b.classList.add('user-account');}updateCartBadge();}
if(typeof supabaseClient!=='undefined'){supabaseClient.auth.onAuthStateChange(()=>updateAuthButton());updateAuthButton();}
window.addToCart=addToCart;window.toggleWishlist=toggleWishlist;window.recordView=recordView;window.handleCartClick=handleCartClick;window.handleWishClick=handleWishClick;window.showToast=showToast;window.updateCartBadge=updateCartBadge;window.productImageUrl=productImageUrl;window.formatPrice=formatPrice;window.escapeHtml=escapeHtml;
renderPublicProducts();
