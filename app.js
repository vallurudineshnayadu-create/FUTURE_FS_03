/* ===== Robust <img> that auto-tries jpg → jpeg → png → webp ===== */
function imgTag(src, alt){
  const safeAlt = alt?.replace(/"/g,"&quot;") ?? "Campus Shoe";
  const base = src.replace(/\.[^.]+$/, "");
  const currentExt = (src.match(/\.([^.]+)$/) || [,"jpg"])[1].toLowerCase();
  const candidates = ["jpg","jpeg","png","webp"].filter(e => e !== currentExt);
  const fallbackSvg = `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800"><rect width="100%" height="100%" fill="#e9f2ff"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#8aa5c9" font-family="Arial" font-size="22">Image not found</text></svg>`
  )}`;
  const onerr = `
    (function(img){
      var base = img.getAttribute('data-base');
      var list = (img.getAttribute('data-tries')||'').split(',').filter(Boolean);
      if(list.length){
        var nextExt = list.shift();
        img.setAttribute('data-tries', list.join(','));
        img.src = base + '.' + nextExt;
      } else {
        img.onerror = null;
        img.src = '${fallbackSvg}';
      }
    })(this)
  `;
  return `<img class="w-full h-full object-cover" alt="${safeAlt}" src="${src}"
    data-base="${base}" data-tries="${candidates.join(',')}" onerror="${onerr}">`;
}

/* ===== Helpers ===== */
const el = (html)=>{ const d=document.createElement('div'); d.innerHTML=html.trim(); return d.firstElementChild; };
const autoNameFromPath = (p)=>p.split("/").pop().replace(/\.[^.]+$/,"").replace(/[-_]+/g," ").replace(/\b\w/g,c=>c.toUpperCase());
const displayName = (p)=> p.name?.trim() || autoNameFromPath(p.img);

/* ===== Product Data (LOCAL image paths) ===== */
const PRODUCTS={ /* ——— same as previous message ——— */ 
  men:[
    { id:"m1",  name:"North Plus", img:"./assets/images/men/north-plus.jpg", price:3499, features:["Breathable mesh upper","Cushioned midsole","Rubber outsole grip"], desc:"Versatile daily runner designed for breathable comfort and steady support." },
    { id:"m2",  name:"Nitro",      img:"./assets/images/men/nitro.jpg",       price:3999, features:["Lightweight build","Responsive ride","Secure heel fit"], desc:"Light and lively—ideal for uptempo runs and everyday workouts." },
    { id:"m3",  name:"Maxico",     img:"./assets/images/men/maxico.jpg",      price:2999, features:["All-day cushioning","Hard-wearing outsole","Classic style"], desc:"Comfort-first sneaker with easy styling for campus and commute." },
    { id:"m4",  name:"Rodeo",      img:"./assets/images/men/rodeo.jpg",       price:3299, features:["Support overlays","Comfort sockliner","Everyday traction"], desc:"Supportive upper with a smooth step-in feel for long walks." },
    { id:"m5",  name:"Oslo Pro",   img:"./assets/images/men/oslo-pro.jpg",    price:3199, features:["Breathable panels","Padded collar","Stable platform"], desc:"Balanced cushioning for strolls, errands and casual training." },
    { id:"m6",  name:"City Ride",  img:"./assets/images/men/city-ride.jpg",   price:4299, features:["Urban tread","Soft foam","Flexible forefoot"], desc:"Built for city distances with grippy tread and flexible feel." },
    { id:"m7",  name:"Revolt",     img:"./assets/images/men/revolt.jpg",      price:2699, features:["Knit upper comfort","Snug fit","Light traction"], desc:"Minimal, cozy, and lightweight—great for daily wear." },
    { id:"m8",  name:"POD",        img:"./assets/images/men/pod.jpg",         price:2899, features:["Plush cushioning","Secure lacing","Durable sole"], desc:"Cushiony everyday sneaker for long days on your feet." },
    { id:"m9",  name:"Brisk",      img:"./assets/images/men/brisk.jpg",       price:3599, features:["Ventilated mesh","Springy midsole","Heel stability"], desc:"Breathable performance for gym sessions and brisk walks." },
    { id:"m10", name:"Baller",     img:"./assets/images/men/baller.jpg",      price:2799, features:["Court-inspired look","Cushioned footbed","Reliable grip"], desc:"Sporty lifestyle silhouette with soft step-in comfort." },
  ],
  women:[
    { id:"w1", name:"Hellen",         img:"./assets/images/women/hellen.jpg",     price:3399, features:["Soft knit upper","Cushioned foam","Sleek profile"], desc:"Smooth, lightweight comfort with an elegant everyday shape." },
    { id:"w2", name:"Claire",         img:"./assets/images/women/claire.jpg",     price:3899, features:["Breathable design","Responsive feel","Secure heel"], desc:"Airy, responsive trainer for daily walks and light runs." },
    { id:"w3", name:"Savvy",          img:"./assets/images/women/savvy.jpg",      price:2699, features:["Flexible forefoot","Supportive midfoot","Soft lining"], desc:"Flex-friendly sneaker that moves naturally with your foot." },
    { id:"w4", name:"Keren",          img:"./assets/images/women/keren.jpg",      price:3099, features:["Comfort collar","Cushioned platform","Everyday tread"], desc:"Cushioned and supportive—made for all-day errands." },
    { id:"w5", name:"Caly",           img:"./assets/images/women/caly.jpg",       price:2999, features:["Lightweight mesh","Plush insole","Stable heel"], desc:"Light and comfy with a clean, modern look." },
    { id:"w6", name:"Nino",           img:"./assets/images/women/nino.jpg",       price:4199, features:["Breathable knit","Soft foam","Secure laces"], desc:"Snug knit upper wraps the foot for a cozy fit." },
    { id:"w7", name:"Mush",           img:"./assets/images/women/mush.jpg",       price:2599, features:["Cushy step-in","Flexible sole","Low weight"], desc:"Easygoing comfort that feels soft from the first wear." },
    { id:"w8", name:"North Plus W",   img:"./assets/images/women/north-plus-w.jpg", price:2799, features:["Breathable upper","Stable base","Grippy outsole"], desc:"Women’s fit of a popular daily runner style." },
    { id:"w9", name:"Force 2.0 W",    img:"./assets/images/women/force-2-0-w.jpg", price:3499, features:["Support frame","Resilient cushioning","Solid traction"], desc:"Steady, supportive platform for walks and workouts." },
    { id:"w10",name:"Swift W",        img:"./assets/images/women/swift-w.jpg",    price:2699, features:["Lightweight ride","Quick feel","Breathable mesh"], desc:"Featherlight feel that’s great for fast-paced days." },
  ],
  kids:[
    { id:"k1", name:"LD-01",            img:"./assets/images/kids/ld-01.jpg",      price:2199, features:["Easy-on design","Soft cushioning","Kid-friendly grip"], desc:"Comfy school-to-play sneaker with simple on/off." },
    { id:"k2", name:"Kape Jr",          img:"./assets/images/kids/kape-jr.jpg",    price:2399, features:["Secure fit","Durable outsole","Breathable upper"], desc:"Active kids’ sneaker built to last through rough play." },
    { id:"k3", name:"Camp Star Kids",   img:"./assets/images/kids/camp-star-kids.jpg", price:1999, features:["Cushy midsole","Soft lining","Everyday traction"], desc:"Soft and comfortable—great for school and outings." },
    { id:"k4", name:"Molly",            img:"./assets/images/kids/molly.jpg",      price:2099, features:["Lightweight","Flexible sole","Secure strap/laces"], desc:"Light, flexible and supportive for growing feet." },
    { id:"k5", name:"Volt Kids",        img:"./assets/images/kids/volt-kids.jpg",  price:1999, features:["Breathable mesh","Cushy footbed","Grip tread"], desc:"Breathable and cushy for playground fun." },
    { id:"k6", name:"Core Kids",        img:"./assets/images/kids/core-kids.jpg",  price:2499, features:["All-day comfort","Durable rubber","Supportive heel"], desc:"Balanced comfort/durability for everyday wear." },
    { id:"k7", name:"Force Kids",       img:"./assets/images/kids/force-kids.jpg", price:1899, features:["Supportive fit","Soft midsole","Secure closure"], desc:"Supportive everyday sneaker for active kids." },
    { id:"k8", name:"Jump Kids",        img:"./assets/images/kids/jump-kids.jpg",  price:1999, features:["Flexible forefoot","Soft cushioning","Traction lugs"], desc:"Flexible and grippy for running and games." },
    { id:"k9", name:"Sky Kids",         img:"./assets/images/kids/sky-kids.jpg",   price:2299, features:["Ventilated upper","Comfort foam","Lightweight build"], desc:"Light and airy feel for all-day comfort." },
    { id:"k10",name:"Tom & Jerry T&J-07V", img:"./assets/images/kids/tj-07v.jpg",  price:1899, features:["Fun graphic theme","Cushioned footbed","Grip outsole"], desc:"Playful themed sneaker kids will love." },
  ],
};
const PRODUCT_INDEX=new Map(Object.values(PRODUCTS).flat().map(p=>[p.id,p]));

/* ===== USERS + SESSION (persistent accounts + orders) ===== */
const USERS_KEY   = "campus_users";   // [{email,password,orders:[...]}]
const SESSION_KEY = "campus_session"; // {email}

const getUsers = () => { try{ return JSON.parse(localStorage.getItem(USERS_KEY)) || []; } catch { return []; } };
const saveUsers = (u) => localStorage.setItem(USERS_KEY, JSON.stringify(u));

const getSession = () => { try{ return JSON.parse(localStorage.getItem(SESSION_KEY)); } catch { return null; } };
const setSession = (email) => localStorage.setItem(SESSION_KEY, JSON.stringify({email}));
const clearSession = () => localStorage.removeItem(SESSION_KEY);

const currentUserEmail = () => getSession()?.email || null;
const getUserByEmail = (email) => getUsers().find(u => u.email === email) || null;

/* ===== CART per-user ===== */
const cartKey = () => {
  const email = currentUserEmail();
  return email ? `campus_cart_${email}` : "campus_cart_guest";
};
const readCart  = () => { try{return JSON.parse(localStorage.getItem(cartKey()))||[];}catch{return[];} };
const writeCart = (items)=>{ localStorage.setItem(cartKey(),JSON.stringify(items)); updateCartBadge(); };

function addToCart(id,qty=1,size=null){
  const items=readCart();
  const it=items.find(i=>i.id===id && i.size===size);
  it? it.qty+=qty:items.push({id,qty,size});
  writeCart(items);
}
function removeFromCart(id,size){
  const items=readCart().filter(i=>!(i.id===id && i.size===size));
  writeCart(items);
}
function setQty(id,size,qty){
  const items=readCart();
  const it=items.find(i=>i.id===id && i.size===size);
  if(it){ it.qty=Math.max(1,qty); writeCart(items); }
}
function setSize(id,oldSize,newSize){
  const items=readCart();
  const idx=items.findIndex(i=>i.id===id && i.size===oldSize);
  if(idx>-1){
    const existing=items.find(i=>i.id===id && i.size===newSize);
    if(existing){ existing.qty+=items[idx].qty; items.splice(idx,1); }
    else { items[idx].size=newSize; }
    writeCart(items);
  }
}
const cartCount=()=>readCart().reduce((n,i)=>n+i.qty,0);
const cartTotal=()=>readCart().reduce((s,i)=>{ const p=PRODUCT_INDEX.get(i.id); return s+(p?p.price:0)*i.qty; },0);
function updateCartBadge(){ const b=document.querySelector('[data-cart-count]'); if(!b) return; const n=cartCount(); b.textContent=n; b.classList.toggle('hidden', !n); }

/* ===== Smooth cart-only refresh (no page reload) ===== */
function refreshCart(){
  if(!location.hash.startsWith('#/cart')) return;
  const app=document.getElementById('app');
  const y=window.scrollY;
  renderCart(app, true);
  window.scrollTo(0,y);
}

/* ===== Toasts ===== */
function showAddedToast(product){
  const container=document.getElementById('toasts'); if(!container) return;
  const t=document.createElement('div'); t.className='toast';
  t.innerHTML=`
    <img src="${product.img}" alt="${displayName(product)}" onerror="this.setAttribute('data-fallback','1')">
    <div><div class="toast-title">Added to cart</div><div class="toast-msg">${displayName(product)}</div></div>
    <button class="toast-close" aria-label="Close">×</button>`;
  const remove=()=>{ t.classList.remove('show'); setTimeout(()=>t.remove(),280); };
  t.querySelector('.toast-close').addEventListener('click', remove);
  container.appendChild(t); requestAnimationFrame(()=> t.classList.add('show')); setTimeout(remove, 2600);
}
function showToast(title, message, type='success'){
  const container=document.getElementById('toasts'); if(!container) return;
  const t=document.createElement('div'); t.className=`toast no-thumb ${type}`;
  t.innerHTML=`
    <div><div class="toast-title">${title}</div><div class="toast-msg">${message||''}</div></div>
    <button class="toast-close" aria-label="Close">×</button>`;
  const remove=()=>{ t.classList.remove('show'); setTimeout(()=>t.remove(),280); };
  t.querySelector('.toast-close').addEventListener('click', remove);
  container.appendChild(t); requestAnimationFrame(()=> t.classList.add('show')); setTimeout(remove, 2600);
}
function addFromList(id){ const p=PRODUCT_INDEX.get(id); addToCart(id,1,null); showAddedToast(p); updateCartBadge(); }

/* ===== Views ===== */
function heroSection(){
  const hero="./assets/images/hero.jpg";
  return `
  <section class="py-10 md:py-16">
    <div class="grid md:grid-cols-2 gap-8 items-center">
      <div class="fade-up">
        <h1 class="text-4xl md:text-5xl font-extrabold leading-tight">Comfort that goes the distance.</h1>
        <p class="mt-4 text-muted">Performance footwear for running, trail, and everyday life.</p>
        <div class="btn-row mt-6">
          <a href="#/men" class="btn-primary">Shop Men</a>
          <a href="#/women" class="btn-ghost">Shop Women</a>
        </div>
      </div>
      <div class="relative aspect-[4/3] rounded-2xl overflow-hidden card shine">
        ${imgTag(hero,"Campus hero")}
      </div>
    </div>
  </section>`;
}

function categoriesSection(){
  return `
  <section class="pb-10">
    <div class="grid md:grid-cols-3 gap-6">
      ${categoryCard("#/men","./assets/images/men/north-plus.jpg","Men")}
      ${categoryCard("#/women","./assets/images/women/hellen.jpg","Women")}
      ${categoryCard("#/kids","./assets/images/kids/ld-01.jpg","Kids")}
    </div>
  </section>`;
}
function categoryCard(href,img,title){
  return `
  <a href="${href}" class="relative rounded-2xl overflow-hidden card shine block">
    <div class="h-56 w-full card-image">${imgTag(img, title+" Category")}</div>
    <div class="p-4 flex items-center justify-between">
      <div><h3 class="font-semibold">${title}</h3><p class="text-sm text-muted">Top picks</p></div>
      <span class="text-[var(--cyan)] font-semibold">Shop →</span>
    </div>
  </a>`;
}

function productCard(p){
  return `
  <div class="card p-3 shine">
    <div class="relative aspect-square rounded-xl overflow-hidden card-image">
      ${imgTag(p.img, displayName(p))}
    </div>
    <div class="mt-3 flex items-start justify-between">
      <div>
        <div class="font-semibold">${displayName(p)}</div>
        <div class="text-muted">₹${p.price}</div>
      </div>
      <div class="flex gap-2">
        <a href="#/product?id=${p.id}" class="px-3 py-2 rounded-lg border border-[color:var(--glass-border)]">View</a>
        <button class="px-3 py-2 rounded-lg btn-primary" onclick="addFromList('${p.id}')">Add</button>
      </div>
    </div>
  </div>`;
}

function listSection(title, items){
  return `
  <section class="py-12">
    <div class="flex items-end justify-between mb-6">
      <h2 class="text-2xl md:text-3xl font-bold section-title">${title}</h2>
      <a href="#/cart" class="text-sm underline">Go to cart →</a>
    </div>
    <div class="grid-cards">
      ${items.map(productCard).join("")}
    </div>
  </section>`;
}

/* Router */
function route(){
  const app=document.getElementById('app');
  const hash=location.hash||'#/';
  const [_, pathAndQuery]=hash.split('#/');
  const [path,queryStr]=(pathAndQuery||'').split('?');
  const params=new URLSearchParams(queryStr||'');

  if(!path||path==='') return renderHome(app);
  if(path==='men')    return renderCategory(app,'men',"Top Men's Shoes");
  if(path==='women')  return renderCategory(app,'women',"Top Women's Shoes");
  if(path==='kids')   return renderCategory(app,'kids',"Top Kids' Shoes");
  if(path==='product')return renderProduct(app, params.get('id'));
  if(path==='cart')   return renderCart(app);
  if(path==='login')  return renderLogin(app);
  if(path==='orders') return renderOrders(app);
  if(path==='order-success') return renderOrderSuccess(app);

  renderHome(app);
}

function renderHome(app){
  app.innerHTML='';
  app.appendChild(el(heroSection()));
  app.appendChild(el(categoriesSection()));
  const teaser=[PRODUCTS.men[0], PRODUCTS.men[1], PRODUCTS.women[0]];
  app.appendChild(el(listSection("Bestsellers", teaser)));
  updateCartBadge();
}

function renderCategory(app, cat, title){
  app.innerHTML='';
  const list=PRODUCTS[cat]||[];
  app.appendChild(el(`<section class="pt-10"><h1 class="text-3xl font-bold section-title">${title}</h1></section>`));
  app.appendChild(el(`<div class="grid-cards pb-14" id="grid"></div>`));
  document.getElementById('grid').innerHTML=list.map(productCard).join('');
  updateCartBadge();
}

/* Product detail with required size */
let selectedSize=null;
function renderProduct(app,id){
  const p=PRODUCT_INDEX.get(id);
  app.innerHTML='';
  if(!p){ app.appendChild(el(`<div class="py-10 text-muted">Product not found. <a class="underline" href="#/">Go home</a>.</div>`)); return; }
  selectedSize=null;
  const sizes=[6,7,8,9,10,11];
  const sizeBtn=(s)=>`<button data-size="${s}" class="px-3 py-2 border border-[color:var(--glass-border)] rounded hover:brightness-110" onclick="selectSize(${s})">UK ${s}</button>`;
  window.selectSize=(s)=>{ selectedSize=s; document.querySelectorAll('[data-size]').forEach(b=>b.classList.remove('ring-2')); document.querySelector(`[data-size="${s}"]`)?.classList.add('ring-2'); };
  window.addProductToCart=()=>{ 
    if(!selectedSize){ showToast('Select a size', 'Please choose a size before adding to cart.', 'error'); return; }
    addToCart(p.id,1,selectedSize);
    showAddedToast(p);
    updateCartBadge();
  };

  const name=displayName(p);
  app.appendChild(el(`
    <section class="py-10">
      <div class="grid md:grid-cols-2 gap-8">
        <div class="rounded-2xl overflow-hidden card shine">
          ${imgTag(p.img, name)}
        </div>
        <div>
          <h1 class="text-3xl font-bold">${name}</h1>
          <div class="mt-2 text-xl font-semibold">₹${p.price}</div>
          <p class="mt-4 text-muted">${p.desc || "Comfortable everyday sneaker with breathable materials and dependable grip."}</p>
          <div class="mt-4">
            <h3 class="font-semibold mb-2">Key features</h3>
            ${featuresList(p.features)}
          </div>
          <div class="mt-4">
            <label class="text-sm text-muted">Size</label>
            <div class="mt-2 flex flex-wrap gap-2">${sizes.map(sizeBtn).join('')}</div>
          </div>
          <div class="mt-6 btn-row">
            <button class="btn-primary" onclick="addProductToCart()">Add to Cart</button>
            <a href="#/cart" class="btn-ghost">Go to Cart</a>
          </div>
          <p class="mt-4 text-xs text-muted">Model names belong to Campus. Specs here are illustrative for demo.</p>
        </div>
      </div>
    </section>
  `));
  updateCartBadge();
}

function featuresList(arr){
  if(!arr?.length) return "";
  return `<ul class="list-disc pl-5 space-y-1 text-sm text-muted">${arr.map(f=>`<li>${f}</li>`).join("")}</ul>`;
}

/* ===== Cart page with instant updates ===== */
function renderCart(app){
  const items=readCart();
  app.innerHTML='';
  if(items.length===0){
    app.appendChild(el(`<div class="py-10 text-muted">Your cart is empty. <a class="underline" href="#/men">Shop now</a>.</div>`));
    updateCartBadge(); return;
  }
  const sizeSelect=(id,current)=>`
    <select class="border border-[color:var(--glass-border)] rounded px-2 py-1 bg-transparent text-white"
            onchange="changeSize('${id}', ${current}, parseInt(this.value,10))">
      ${[6,7,8,9,10,11].map(s=>`<option ${s===(current??9)?'selected':''} value="${s}">UK ${s}</option>`).join('')}
    </select>`;

  const listHtml=items.map(i=>{
    const p=PRODUCT_INDEX.get(i.id); if(!p) return '';
    const key = `${i.id}@${i.size??'null'}`;
    return `
      <div class="flex items-center gap-4 card p-3" data-line="${key}">
        ${imgTag(p.img, displayName(p)).replace('w-full h-full','w-20 h-20')}
        <div class="flex-1">
          <div class="font-medium">${displayName(p)}</div>
          <div class="text-sm text-muted">₹${p.price} each</div>
          <div class="text-sm mt-1">Size: ${sizeSelect(p.id, i.size ?? 9)}</div>
        </div>
        <div class="flex items-center gap-2">
          <button class="px-2 py-1 border border-[color:var(--glass-border)] rounded" onclick="decreaseQty('${p.id}', ${i.size ?? 9})">-</button>
          <span>${i.qty}</span>
          <button class="px-2 py-1 border border-[color:var(--glass-border)] rounded" onclick="increaseQty('${p.id}', ${i.size ?? 9})">+</button>
          <button class="px-2 py-1 border border-[color:var(--glass-border)] rounded" onclick="removeLine('${p.id}', ${i.size ?? 9})">Remove</button>
        </div>
      </div>`;
  }).join('');

  app.appendChild(el(`
    <section class="py-10 max-w-3xl mx-auto">
      <h1 class="text-3xl font-bold section-title">Your Cart</h1>
      <div class="space-y-4 mt-6" id="cart-lines">${listHtml}</div>
      <div class="flex items-center justify-between mt-6">
        <div class="text-lg font-semibold">Total</div>
        <div class="text-xl font-bold" id="cart-total">₹${cartTotal()}</div>
      </div>
      <div class="mt-4 btn-row">
        <a href="#/men" class="btn-ghost">Continue shopping</a>
        <button class="btn-primary" onclick="checkout()">Checkout</button>
      </div>
    </section>
  `));
  updateCartBadge();
}

/* Instant-action handlers */
window.increaseQty = (id,size)=>{ const items=readCart(); const it=items.find(i=>i.id===id && i.size===size); if(it){ it.qty++; writeCart(items); } refreshCart(); };
window.decreaseQty = (id,size)=>{ const items=readCart(); const it=items.find(i=>i.id===id && i.size===size); if(it){ it.qty=Math.max(1,it.qty-1); writeCart(items); } refreshCart(); };
window.removeLine  = (id,size)=>{ removeFromCart(id,size); refreshCart(); };
window.changeSize  = (id,oldSize,newSize)=>{ setSize(id,oldSize,newSize); refreshCart(); };

/* ===== Auth: signup/login/logout (persistent) ===== */
function renderLogin(app){
  app.innerHTML=`
  <section class="py-10 grid place-items-center">
    <div class="w-full max-w-sm card p-6">
      <h1 class="text-2xl font-bold">Welcome back</h1>
      <p class="text-sm text-muted mt-1">Login (demo auth)</p>
      <form class="mt-6 space-y-3" onsubmit="event.preventDefault();">
        <div><label class="text-sm text-muted">Email</label>
          <input id="login-email" type="email" class="mt-1 w-full border border-[color:var(--glass-border)] rounded-lg px-3 py-2 bg-transparent text-white" required>
        </div>
        <div><label class="text-sm text-muted">Password</label>
          <input id="login-pass" type="password" class="mt-1 w-full border border-[color:var(--glass-border)] rounded-lg px-3 py-2 bg-transparent text-white" required>
        </div>
        <button class="w-full btn-primary" onclick="handleLogin()">Login</button>
        <button class="w-full px-4 py-2 rounded-xl border border-[color:var(--glass-border)]" onclick="handleSignup()">Create account</button>
      </form>
    </div>
  </section>`;
  updateCartBadge();
}

function handleSignup(){
  const email = document.getElementById('login-email').value.trim().toLowerCase();
  const pass  = document.getElementById('login-pass').value;

  if(!email || !pass){ showToast('Missing info','Enter email and password.','error'); return; }

  const users = getUsers();
  if(users.some(u=>u.email===email)){
    showToast('Account exists','Please login with your password.','error');
    return;
  }
  users.push({email, password: pass, orders: []});
  saveUsers(users);
  showToast('Account created successfully','Now click Login.','success');
}

function handleLogin(){
  const email = document.getElementById('login-email').value.trim().toLowerCase();
  const pass  = document.getElementById('login-pass').value;

  const user = getUserByEmail(email);
  if(!user || user.password !== pass){
    showToast('Login failed','Invalid email or password.','error');
    return;
  }
  setSession(email);
  updateAuthNav();
  updateCartBadge(); // load the right cart bucket
  showToast('Logged in successfully','Welcome back!','success');
  setTimeout(()=> location.hash = '#/', 400);
}

function logoutWithToast(){
  clearSession();
  updateAuthNav();
  updateCartBadge(); // switch to guest cart
  showToast('Logged out','See you soon!','success');
  location.hash = '#/';
}

/* Navbar auth/links */
function updateAuthNav(){
  const linkAuth  = document.getElementById('nav-auth');
  const linkOrder = document.getElementById('nav-orders');
  const email = currentUserEmail();

  if(email){
    if(linkAuth){
      linkAuth.textContent = 'Logout';
      linkAuth.href = '#/';
      linkAuth.onclick = (e)=>{ e.preventDefault(); logoutWithToast(); };
    }
    linkOrder?.classList.remove('hidden');
  }else{
    if(linkAuth){
      linkAuth.textContent = 'Login';
      linkAuth.href = '#/login';
      linkAuth.onclick = null;
    }
    linkOrder?.classList.add('hidden');
  }
}

/* ===== Orders ===== */
function renderOrders(app){
  const email = currentUserEmail();
  if(!email){
    app.innerHTML = `<section class="py-12"><p class="text-muted">Please <a class="underline" href="#/login">login</a> to view your orders.</p></section>`;
    return;
  }
  const user = getUserByEmail(email);
  const orders = user?.orders || [];

  if(orders.length===0){
    app.innerHTML = `<section class="py-12"><h1 class="text-3xl font-bold section-title">My Orders</h1><p class="mt-6 text-muted">You have no orders yet.</p></section>`;
    return;
  }

  const orderCard = (o)=>`
    <div class="card p-4">
      <div class="flex items-center justify-between">
        <div class="font-semibold">Order #${o.id}</div>
        <div class="text-sm text-muted">${new Date(o.date).toLocaleString()}</div>
      </div>
      <div class="mt-3 space-y-2">
        ${o.items.map(it=>{
          const p=PRODUCT_INDEX.get(it.id);
          return `<div class="flex items-center gap-3">
            ${imgTag(p.img, displayName(p)).replace('w-full h-full','w-14 h-14')}
            <div class="flex-1">
              <div class="font-medium">${displayName(p)}</div>
              <div class="text-sm text-muted">Size: UK ${it.size} • Qty: ${it.qty}</div>
            </div>
            <div class="font-semibold">₹${it.priceAtOrder*it.qty}</div>
          </div>`;
        }).join('')}
      </div>
      <div class="mt-3 text-right font-bold">Total: ₹${o.total}</div>
    </div>
  `;

  app.innerHTML = `
    <section class="py-10">
      <h1 class="text-3xl font-bold section-title">My Orders</h1>
      <div class="mt-6 grid gap-4">${orders.slice().reverse().map(orderCard).join('')}</div>
    </section>
  `;
}

/* ===== Checkout -> save order to user ===== */
function checkout(){
  const email = currentUserEmail();
  if(!email){
    showToast('Please login','Login to place your order.','error');
    location.hash = '#/login';
    return;
  }
  const items = readCart();
  if(items.length===0){ showToast('Cart empty','Add items before checkout.','error'); return; }

  const users = getUsers();
  const idx   = users.findIndex(u=>u.email===email);
  if(idx===-1){ showToast('Error','User not found.','error'); return; }

  const orderId = Date.now().toString(36).toUpperCase();
  const order = {
    id: orderId,
    date: Date.now(),
    items: items.map(i=>{
      const p=PRODUCT_INDEX.get(i.id);
      return { id:i.id, size:i.size??9, qty:i.qty, priceAtOrder:p?.price||0 };
    }),
    total: cartTotal()
  };
  users[idx].orders = users[idx].orders || [];
  users[idx].orders.push(order);
  saveUsers(users);

  // Clear this user's cart
  writeCart([]); 

  updateCartBadge();
  location.hash = '#/order-success';
}

function renderOrderSuccess(app){
  app.innerHTML=`
  <section class="py-16 grid place-items-center">
    <div class="max-w-md card p-8 text-center">
      <div class="text-4xl">🎉</div>
      <h1 class="text-2xl font-bold mt-2">Order placed!</h1>
      <p class="text-muted mt-2">Thank you for your purchase. You can review it anytime in <a class="underline" href="#/orders">My Orders</a>.</p>
      <a href="#/" class="mt-6 inline-flex btn-primary">Back to Home</a>
    </div>
  </section>`;
}

/* ===== Boot ===== */
window.addEventListener('hashchange', ()=>{ updateAuthNav(); route(); });
window.addEventListener('DOMContentLoaded', ()=>{ updateAuthNav(); updateCartBadge(); route(); });
