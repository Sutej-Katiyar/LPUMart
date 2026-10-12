/* Floating cart UI — anchored to the navbar cart button. */
(function(){
  let cartButton, cartPanel, cartList, cartSubtotal, cartCountBadge;
  let closeTimer;

  function money(v){ return '₹'+Number(v||0).toLocaleString('en-IN'); }
  function esc(v){ return String(v??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#039;'); }
  async function user(){ const {data:{session}}=await supabaseClient.auth.getSession(); return session?.user||null; }

  function build(){
    if(document.getElementById('floatingCartButton')) return;
    const actions=document.querySelector('.nav-actions');
    if(!actions) return;

    const wrap=document.createElement('div');
    wrap.className='floating-cart-wrap';
    wrap.innerHTML=`
      <button class="cart-nav-btn" id="floatingCartButton" type="button" aria-label="Open cart" aria-expanded="false">
        <span class="cart-nav-icon">🛒</span><span class="cart-nav-label">Cart</span><span class="cart-nav-count" data-cart-count>0</span>
      </button>
      <section class="floating-cart-panel" id="floatingCartPanel" aria-label="Shopping cart" aria-hidden="true">
        <div class="floating-cart-head"><div><p class="floating-cart-kicker">YOUR BAG</p><h3>Shopping Cart</h3></div><button class="floating-cart-close" id="floatingCartClose" type="button" aria-label="Close cart">×</button></div>
        <div class="floating-cart-list" id="floatingCartList"></div>
        <div class="floating-cart-foot"><div class="floating-cart-total"><span>Subtotal</span><strong id="floatingCartSubtotal">₹0</strong></div><div class="floating-cart-actions"><a class="floating-cart-secondary" href="account.html#cart">View Cart</a><a class="floating-cart-primary" href="checkout.html" id="floatingCartCheckout">Checkout <span>→</span></a></div></div>
      </section>`;
    actions.insertBefore(wrap, actions.firstChild);
    cartButton=wrap.querySelector('#floatingCartButton');cartPanel=wrap.querySelector('#floatingCartPanel');cartList=wrap.querySelector('#floatingCartList');cartSubtotal=wrap.querySelector('#floatingCartSubtotal');cartCountBadge=wrap.querySelector('[data-cart-count]');
    cartButton.addEventListener('click',()=>toggle());
    wrap.querySelector('#floatingCartClose').addEventListener('click',()=>close());
    document.addEventListener('click',e=>{if(cartPanel?.classList.contains('is-open') && !wrap.contains(e.target)) close();});
    document.addEventListener('keydown',e=>{if(e.key==='Escape')close();});
    update();
  }

  function open(focus=false){
    build(); if(!cartPanel)return;
    clearTimeout(closeTimer); cartPanel.classList.add('is-open'); cartPanel.setAttribute('aria-hidden','false'); cartButton?.setAttribute('aria-expanded','true');
    render();
    if(focus){cartButton?.classList.remove('cart-added-pop');void cartButton?.offsetWidth;cartButton?.classList.add('cart-added-pop');cartPanel.classList.add('cart-item-added');setTimeout(()=>cartPanel?.classList.remove('cart-item-added'),650);}
  }
  function close(){if(!cartPanel)return;cartPanel.classList.remove('is-open');cartPanel.setAttribute('aria-hidden','true');cartButton?.setAttribute('aria-expanded','false');}
  function toggle(){cartPanel?.classList.contains('is-open')?close():open();}

  async function render(){
    if(!cartList)return;
    const u=await user();
    if(!u){cartList.innerHTML='<div class="floating-cart-empty"><div class="floating-cart-empty-icon">🛒</div><strong>Sign in to see your cart</strong><p>Your cart is saved to your account.</p><a href="auth.html" class="floating-cart-primary">Sign in</a></div>';cartSubtotal.textContent='₹0';return;}
    const {data,error}=await supabaseClient.from('cart_items').select('id,product_id,quantity,products(*)').eq('user_id',u.id).order('created_at',{ascending:false});
    if(error){cartList.innerHTML='<div class="floating-cart-empty"><strong>Could not load your cart</strong><p>Try again in a moment.</p></div>';return;}
    const items=data||[];let total=0;let count=0;
    if(!items.length){cartList.innerHTML='<div class="floating-cart-empty"><div class="floating-cart-empty-icon">🛒</div><strong>Your cart is empty</strong><p>Add something you like and it will appear here.</p><a href="products.html" class="floating-cart-primary">Browse Products</a></div>';cartSubtotal.textContent='₹0';return;}
    cartList.innerHTML=items.map(item=>{const p=item.products||{};const qty=Math.max(1,Number(item.quantity||1));const line=Number(p.price||0)*qty;total+=line;count+=qty;return `<article class="floating-cart-item"><img src="${productImageUrl(p)}" alt="${esc(p.name)}"><div class="floating-cart-item-main"><a href="product.html?id=${p.id}" class="floating-cart-item-name">${esc(p.name)}</a><span class="floating-cart-item-price">${money(p.price)}</span><div class="floating-cart-qty"><button type="button" onclick="window.floatingCartQty(${item.id},${qty-1})" ${qty<=1?'disabled':''}>−</button><span>${qty}</span><button type="button" onclick="window.floatingCartQty(${item.id},${qty+1})">+</button><button class="floating-cart-remove" type="button" onclick="window.floatingCartRemove(${item.id})">Remove</button></div></div><strong class="floating-cart-line">${money(line)}</strong></article>`;}).join('');
    cartSubtotal.textContent=money(total);if(cartCountBadge)cartCountBadge.textContent=count;
  }
  async function qty(id,quantity){if(quantity<1)return remove(id);const {error}=await supabaseClient.from('cart_items').update({quantity,updated_at:new Date().toISOString()}).eq('id',id);if(error){showToast(error.message);return;}await render();update();}
  async function remove(id){const {error}=await supabaseClient.from('cart_items').delete().eq('id',id);if(error){showToast(error.message);return;}await render();update();showToast('Removed from cart');}
  async function update(){
    build();const u=await user();const badges=document.querySelectorAll('[data-cart-count]');if(!u){badges.forEach(b=>b.textContent='0');return;}
    const {data}=await supabaseClient.from('cart_items').select('quantity').eq('user_id',u.id);const count=(data||[]).reduce((s,x)=>s+Number(x.quantity||0),0);badges.forEach(b=>b.textContent=count);
  }
  window.openFloatingCart=open;window.closeFloatingCart=close;window.floatingCartQty=qty;window.floatingCartRemove=remove;window.refreshFloatingCart=()=>{update();if(cartPanel?.classList.contains('is-open'))render();};
  window.addEventListener('marketplaceModeChanged',()=>{ if(cartPanel?.classList.contains('is-open')) render(); });
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',build);else build();
})();
