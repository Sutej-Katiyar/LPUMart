/* ================= MARKETPLACE MODE ================= */
const MARKETPLACE_MODES = {
    normal:{label:"General",icon:"🛍️",description:"Shop electronics, fashion, home and more.",categories:["Electronics","Fashion","Home & Living","Beauty","Sports","Books"]},
    grocery:{label:"Grocery",icon:"🛒",description:"Fresh groceries and everyday essentials.",categories:["Fruits & Vegetables","Dairy","Bakery","Staples","Snacks","Beverages","Household"]},
    pharmacy:{label:"Pharmacy",icon:"💊",description:"Medicines, wellness and healthcare essentials.",categories:["Medicines","Personal Care","Vitamins & Supplements","First Aid","Baby Care","Medical Devices"]}
};

function getMarketplaceMode(){
    const saved=localStorage.getItem("marketplaceMode");
    return MARKETPLACE_MODES[saved]?saved:"normal";
}

function setMarketplaceMode(mode){
    if(!MARKETPLACE_MODES[mode] || mode===getMarketplaceMode()) return;
    localStorage.setItem("marketplaceMode",mode);
    applyMarketplaceMode();
    // Switch the marketplace in-place. No window.location.reload(), navigation, or page refresh.
    window.dispatchEvent(new CustomEvent("marketplaceModeChanged",{detail:{mode,previousMode:document.documentElement.dataset.previousMarketplaceMode||null}}));
    document.documentElement.dataset.previousMarketplaceMode=mode;
}

function getModeConfig(){return MARKETPLACE_MODES[getMarketplaceMode()];}
function modeClass(mode){return `mode-${mode}`;}

function applyMarketplaceMode(){
    const mode=getMarketplaceMode(), config=MARKETPLACE_MODES[mode];
    document.body.classList.remove("mode-normal","mode-grocery","mode-pharmacy");
    document.body.classList.add(modeClass(mode));
    document.documentElement.dataset.marketplaceMode=mode;
    document.querySelectorAll("[data-marketplace-mode]").forEach(btn=>{
        const active=btn.dataset.marketplaceMode===mode;
        btn.classList.toggle("active",active);
        btn.setAttribute("aria-pressed",String(active));
    });
    document.querySelectorAll("[data-mode-label]").forEach(el=>el.textContent=config.label);
    document.querySelectorAll("[data-mode-description]").forEach(el=>el.textContent=config.description);
    const logoMode=document.getElementById("logoMode");
    if(logoMode) logoMode.textContent=`${config.icon} ${config.label}`;
}

function setupMarketplaceModeSwitcher(){
    document.querySelectorAll("[data-marketplace-mode]").forEach(btn=>{
        btn.onclick=(event)=>{
            event.preventDefault();
            setMarketplaceMode(btn.dataset.marketplaceMode);
        };
    });
    applyMarketplaceMode();
}

window.MARKETPLACE_MODES=MARKETPLACE_MODES;
window.getMarketplaceMode=getMarketplaceMode;
window.setMarketplaceMode=setMarketplaceMode;
window.getModeConfig=getModeConfig;
window.applyMarketplaceMode=applyMarketplaceMode;
window.setupMarketplaceModeSwitcher=setupMarketplaceModeSwitcher;

if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',setupMarketplaceModeSwitcher);
else setupMarketplaceModeSwitcher();
