(function () {
  function initFeatureMenu() {
    if (document.getElementById('featureMenuToggle')) return;

    // A small marketplace utility bar inspired by common ecommerce patterns,
    // while keeping the site's original purple/blue visual language.
    const utility = document.createElement('div');
    utility.className = 'marketplace-utility-bar';
    utility.innerHTML = `
      <div class="utility-inner">
        <span>✓ Secure checkout</span>
        <span>✓ Easy order tracking</span>
        <span>✓ Wishlist & saved cart</span>
        <span>✓ Customer support</span>
      </div>`;
    document.body.prepend(utility);

    // Keep marketplace switching available on every public page, including utility pages.
    const nav = document.querySelector('.navbar');
    if (nav && !nav.querySelector('.mode-switcher')) {
      const mode = document.createElement('div');
      mode.className = 'mode-switcher';
      mode.setAttribute('aria-label','LPUMart mode');
      mode.innerHTML = `<button type="button" data-marketplace-mode="normal">🛍️ General</button><button type="button" data-marketplace-mode="grocery">🛒 Grocery</button><button type="button" data-marketplace-mode="pharmacy">💊 Pharmacy</button>`;
      const logo = nav.querySelector('.logo');
      if (logo) logo.after(mode);
      if (typeof window.setupMarketplaceModeSwitcher === 'function') window.setupMarketplaceModeSwitcher();
    }

    // Keep the header focused: search remains inside the Features drawer instead of
    // competing with the main navigation.

    // Turn the three marketplace mode buttons into one compact selector.
    if (nav) {
      const mode = nav.querySelector('.mode-switcher');
      if (mode && !mode.classList.contains('compact-mode-switcher')) {
        mode.classList.add('compact-mode-switcher');
        const toggle = document.createElement('button');
        toggle.type = 'button';
        toggle.className = 'mode-selector-toggle';
        toggle.setAttribute('aria-haspopup', 'listbox');
        toggle.setAttribute('aria-expanded', 'false');
        const initialMode = window.getMarketplaceMode?.() || 'normal';
        const initialConfig = window.getModeConfig?.() || {icon:'🛍️', label:'General'};
        toggle.innerHTML = `<span id="headerModeLabel">${initialConfig.icon} ${initialConfig.label}</span><span class="mode-chevron" aria-hidden="true">⌄</span>`;
        mode.insertBefore(toggle, mode.firstChild);
        toggle.addEventListener('click', (e) => {
          e.stopPropagation();
          const open = mode.classList.toggle('open');
          toggle.setAttribute('aria-expanded', String(open));
        });
        mode.querySelectorAll('[data-marketplace-mode]').forEach(btn => {
          btn.addEventListener('click', () => {
            mode.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
          });
        });
        document.addEventListener('click', () => {
          mode.classList.remove('open');
          toggle.setAttribute('aria-expanded', 'false');
        });
      }
    }

    const links = [
      ['⌂', 'Home', 'index.html'],
      ['🔎', 'Browse Products', 'products.html'],
      ['▦', 'Categories', 'categories.html'],
      ['🏷️', 'Deals & Top Rated', 'deals.html'],
      ['⚖️', 'Compare Products', 'compare.html'],
      ['♡', 'Wishlist', 'wishlist.html'],
      ['🛒', 'Cart', 'account.html#cart'],
      ['💳', 'Checkout', 'checkout.html'],
      ['📦', 'My Orders', 'account.html#orders'],
      ['🚚', 'Track Order', 'track-order.html'],
      ['↩️', 'Returns & Help', 'returns.html'],
      ['👤', 'My Account', 'account.html'],
      ['⚙️', 'Admin Dashboard', 'admin-login.html'],
      ['✉️', 'Contact Support', 'contact.html']
    ];

    const wrap = document.createElement('div');
    wrap.innerHTML = `
      <button class="feature-menu-toggle" id="featureMenuToggle" type="button" aria-label="Open marketplace features" aria-expanded="false">
        <span>☰</span><b>Features</b>
      </button>
      <div class="feature-menu-overlay" id="featureMenuOverlay"></div>
      <aside class="feature-drawer" id="featureDrawer" aria-hidden="true">
        <div class="feature-drawer-head">
          <div><span class="eyebrow">MARKETPLACE TOOLS</span><h2>Features</h2><p>Everything useful, one click away.</p></div>
          <button class="feature-drawer-close" id="featureMenuClose" type="button" aria-label="Close features">×</button>
        </div>
        <div class="feature-drawer-search">
          <input id="drawerSearch" type="search" placeholder="Search products..."><button id="drawerSearchBtn" type="button">Search</button>
        </div>
        <div class="feature-drawer-links">
          ${links.map(([icon, label, href]) => `<a href="${href}" class="feature-drawer-link"><span>${icon}</span><strong>${label}</strong><em>›</em></a>`).join('')}
        </div>
        <div class="drawer-mode-note"><span>🛍️</span><div><strong>Switch marketplace</strong><small>General · Grocery · Pharmacy</small></div></div>
      </aside>`;

    while (wrap.firstElementChild) document.body.appendChild(wrap.firstElementChild);

    const toggle = document.getElementById('featureMenuToggle');
    const drawer = document.getElementById('featureDrawer');
    const overlay = document.getElementById('featureMenuOverlay');
    const close = document.getElementById('featureMenuClose');

    function setOpen(open) {
      drawer.classList.toggle('open', open);
      overlay.classList.toggle('show', open);
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
      drawer.setAttribute('aria-hidden', String(!open));
      document.body.classList.toggle('feature-menu-open', open);
      if (open) document.getElementById('drawerSearch')?.focus();
    }

    toggle.addEventListener('click', () => setOpen(!drawer.classList.contains('open')));
    close.addEventListener('click', () => setOpen(false));
    overlay.addEventListener('click', () => setOpen(false));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') setOpen(false); });
    drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setOpen(false)));

    function runDrawerSearch() {
      const value = document.getElementById('drawerSearch')?.value.trim();
      if (value) location.href = 'products.html?search=' + encodeURIComponent(value);
    }
    document.getElementById('drawerSearchBtn')?.addEventListener('click', runDrawerSearch);
    document.getElementById('drawerSearch')?.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); runDrawerSearch(); } });

    window.addEventListener('marketplaceModeChanged', () => {
      const mode = document.querySelector('.compact-mode-switcher');
      const label = document.getElementById('headerModeLabel');
      const config = window.getModeConfig?.();
      if (mode && label && config) label.textContent = `${config.icon} ${config.label}`;
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initFeatureMenu);
  else initFeatureMenu();
})();
