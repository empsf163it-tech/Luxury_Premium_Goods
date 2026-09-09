/* ==========================================================================
   MAVITAS Luxury Marketplace — Core Application Logic & Dossier Controller
   ========================================================================== */

const CART_KEY = "mavitas_cart";

// MAVITAS Luxury Product Catalogue Database
const PRODUCTS = [
  {
    id: "1",
    title: "Atelier Chronograph",
    category: "watch",
    categoryLabel: "Swiss Watch",
    price: 840000,
    status: "JUST IN",
    verified: true,
    image: "assets/images/atelier_chronograph.jpg",
    thumbs: [
      "assets/images/atelier_chronograph.jpg",
      "assets/images/sculptural_gold_ring.jpg",
      "assets/images/carryall_bag.jpg"
    ],
    description: "A restrained Swiss chronograph selected for its balanced proportions, mechanical character, and exceptional physical condition. Includes original atelier certification and verified provenance records.",
    material: "18k Solid Yellow Gold & Hand-stitched Alligator Leather",
    condition: "Mint (9.9 / 10)",
    year: "2024",
    origin: "Geneva, Switzerland",
    serial: "MV-CHRO-8842",
    dimensions: "40mm Diameter · 11.2mm Thickness",
    delivery: "Insured Express Sourcing (3–5 Business Days)",
    returns: "7 Days Discreet Collection Return"
  },
  {
    id: "2",
    title: "No. 7 Carryall",
    category: "fashion",
    categoryLabel: "Leather Goods",
    price: 265000,
    status: "VERIFIED",
    verified: true,
    image: "assets/images/carryall_bag.jpg",
    thumbs: [
      "assets/images/carryall_bag.jpg",
      "assets/images/atelier_chronograph.jpg",
      "assets/images/sculptural_gold_ring.jpg"
    ],
    description: "An architectural tote crafted from full-grain calfskin with subtle champagne gold hardware. Hand-finished edges and understated interior compartments designed for long-term utility.",
    material: "Full-grain Taurillon Leather & Solid Brass Hardware",
    condition: "Pristine / Unused (10 / 10)",
    year: "2023",
    origin: "Paris, France",
    serial: "MV-BAG-7019",
    dimensions: "38cm × 28cm × 16cm",
    delivery: "White-glove Insured Courier",
    returns: "7 Days Discreet Collection Return"
  },
  {
    id: "3",
    title: "Sculptural Gold Ring",
    category: "jewelry",
    categoryLabel: "Fine Jewelry",
    price: 490000,
    status: "LIMITED",
    verified: true,
    image: "assets/images/sculptural_gold_ring.jpg",
    thumbs: [
      "assets/images/sculptural_gold_ring.jpg",
      "assets/images/atelier_chronograph.jpg",
      "assets/images/carryall_bag.jpg"
    ],
    description: "A heavy 18k yellow gold ring featuring geometric facets inspired by modernist sculpture. Set with a single baguette-cut champagne diamond with full laboratory authentication.",
    material: "18k Solid Yellow Gold (750) & 0.45ct Champagne Diamond",
    condition: "Mint (9.8 / 10)",
    year: "2024",
    origin: "Milan, Italy",
    serial: "MV-JWL-4401",
    dimensions: "Size 54 (Resizable upon request)",
    delivery: "Armored Transport Sourcing",
    returns: "7 Days Discreet Collection Return"
  },
  {
    id: "4",
    title: "Heritage Automatic",
    category: "watch",
    categoryLabel: "Swiss Watch",
    price: 620000,
    status: "PRIVATE SALE",
    verified: true,
    image: "assets/images/atelier_chronograph.jpg",
    thumbs: [
      "assets/images/atelier_chronograph.jpg",
      "assets/images/sculptural_gold_ring.jpg"
    ],
    description: "A vintage-inspired automatic movement timepiece with champagne dial and blued steel hands. Kept in private vault storage and recently serviced by specialist horologists.",
    material: "Stainless Steel & Dark Alligator Strap",
    condition: "Excellent (9.6 / 10)",
    year: "2021",
    origin: "Zürich, Switzerland",
    serial: "MV-WAT-9022",
    dimensions: "38mm Diameter · Automatic Movement",
    delivery: "Insured Express Sourcing",
    returns: "7 Days Discreet Collection Return"
  },
  {
    id: "5",
    title: "Silk Evening Coat",
    category: "fashion",
    categoryLabel: "Editorial Outerwear",
    price: 195000,
    status: "JUST IN",
    verified: true,
    image: "assets/images/carryall_bag.jpg",
    thumbs: [
      "assets/images/carryall_bag.jpg",
      "assets/images/sculptural_gold_ring.jpg"
    ],
    description: "Tailored structured evening coat cut from heavy Mulberry silk faille. Unstructured shoulders, hidden horn buttons, and silk lining.",
    material: "100% Heavy Mulberry Silk Faille & Horn Buttons",
    condition: "New with Dossier Tags",
    year: "2024",
    origin: "London, UK",
    serial: "MV-FSH-1284",
    dimensions: "European Size 38 (Medium)",
    delivery: "White-glove Insured Courier",
    returns: "7 Days Discreet Collection Return"
  },
  {
    id: "6",
    title: "Signet Ring No. 3",
    category: "jewelry",
    categoryLabel: "Fine Jewelry",
    price: 140000,
    status: "VERIFIED",
    verified: true,
    image: "assets/images/sculptural_gold_ring.jpg",
    thumbs: [
      "assets/images/sculptural_gold_ring.jpg",
      "assets/images/atelier_chronograph.jpg"
    ],
    description: "Minimalist signet ring crafted from recycled 18k gold with a satin finish and flat face for custom engraving.",
    material: "Recycled 18k Yellow Gold",
    condition: "Mint (9.8 / 10)",
    year: "2023",
    origin: "Kyoto, Japan",
    serial: "MV-JWL-3091",
    dimensions: "Size 52",
    delivery: "Insured Express Sourcing",
    returns: "7 Days Discreet Collection Return"
  }
];

// Utility Helpers
function formatMoney(amount) {
  return "₹" + Number(amount).toLocaleString("en-IN");
}

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
  } catch (e) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartUI();
}

function addToCart(productId) {
  const product = PRODUCTS.find(p => p.id === String(productId)) || PRODUCTS[0];
  const cart = getCart();
  cart.push(product);
  saveCart(cart);
  openDrawer();
}

function removeFromCart(index) {
  const cart = getCart();
  if (index >= 0 && index < cart.length) {
    cart.splice(index, 1);
    saveCart(cart);
  }
}

function clearCart() {
  localStorage.removeItem(CART_KEY);
  updateCartUI();
}

function updateCartUI() {
  const cart = getCart();
  const counts = document.querySelectorAll(".cart-count");
  counts.forEach(el => el.textContent = cart.length);
  renderDrawerItems();
  renderCheckoutPage();
}

// Cart Drawer Controller
function initDrawer() {
  if (!document.querySelector(".cart-drawer")) {
    const drawerHTML = `
      <div class="drawer-curtain" id="drawerCurtain" onclick="closeDrawer()"></div>
      <div class="cart-drawer" id="cartDrawer">
        <div class="drawer-header">
          <h3>Your Collection (<span class="cart-count">0</span>)</h3>
          <button class="drawer-close" onclick="closeDrawer()" aria-label="Close drawer">×</button>
        </div>
        <div class="drawer-items" id="drawerItemsList"></div>
        <div class="drawer-footer">
          <div class="drawer-subtotal">
            <span>Total Value</span>
            <strong id="drawerTotalValue">₹0</strong>
          </div>
          <a href="checkout.html" class="btn primary wide" style="width:100%; text-align:center;">Proceed to Acquisition →</a>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML("beforeend", drawerHTML);
  }

  document.querySelectorAll("a[href='checkout.html'].icon-btn, .cart-trigger").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      openDrawer();
    });
  });

  updateCartUI();
}

function openDrawer() {
  const curtain = document.querySelector("#drawerCurtain");
  const drawer = document.querySelector("#cartDrawer");
  if (curtain && drawer) {
    curtain.classList.add("open");
    drawer.classList.add("open");
  }
}

function closeDrawer() {
  const curtain = document.querySelector("#drawerCurtain");
  const drawer = document.querySelector("#cartDrawer");
  if (curtain && drawer) {
    curtain.classList.remove("open");
    drawer.classList.remove("open");
  }
}

function renderDrawerItems() {
  const container = document.querySelector("#drawerItemsList");
  const totalEl = document.querySelector("#drawerTotalValue");
  if (!container) return;

  const cart = getCart();
  if (cart.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding: 60px 0; color: var(--text-secondary);">
        <p style="font-family: var(--font-serif); font-size: 24px;">Your collection is empty.</p>
        <p style="font-size: 12px; margin-top: 12px;">Objects selected for purchase will appear here.</p>
        <a href="collection.html" onclick="closeDrawer()" class="link" style="margin-top: 20px;">Explore Collection →</a>
      </div>
    `;
    if (totalEl) totalEl.textContent = formatMoney(0);
    return;
  }

  let total = 0;
  container.innerHTML = cart.map((item, index) => {
    total += Number(item.price);
    return `
      <div class="drawer-item">
        <img class="drawer-item-img" src="${item.image}" alt="${item.title}">
        <div class="drawer-item-details">
          <div>
            <div class="drawer-item-name">${item.title}</div>
            <div style="font-family: var(--font-label); font-size: 10px; color: var(--text-secondary); text-transform: uppercase; margin-top: 4px;">${item.categoryLabel || 'Luxury Item'}</div>
          </div>
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <div class="drawer-item-price">${formatMoney(item.price)}</div>
            <button class="drawer-item-remove" onclick="removeFromCart(${index})">Remove</button>
          </div>
        </div>
      </div>
    `;
  }).join("");

  if (totalEl) totalEl.textContent = formatMoney(total);
}

// Custom Cursor Controller
function initCustomCursor() {
  if (window.innerWidth <= 900) return;

  let cursor = document.querySelector(".custom-cursor");
  if (!cursor) {
    cursor = document.createElement("div");
    cursor.className = "custom-cursor";
    cursor.innerHTML = `<span class="custom-cursor-text" id="cursorText">VIEW</span>`;
    document.body.appendChild(cursor);
  }

  const cursorText = document.querySelector("#cursorText");

  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
    if (!cursor.classList.contains("active")) {
      cursor.classList.add("active");
    }
  });

  document.addEventListener("mouseleave", () => {
    cursor.classList.remove("active");
  });

  const setupHoverListeners = () => {
    document.querySelectorAll(".card, .gallery-main-frame, .hero-frame, .category-card").forEach(el => {
      el.addEventListener("mouseenter", () => {
        cursor.classList.add("hovering-card");
        if (el.classList.contains("gallery-main-frame")) {
          cursorText.textContent = "ZOOM";
        } else if (el.classList.contains("category-card")) {
          cursorText.textContent = "EXPLORE";
        } else {
          cursorText.textContent = "VIEW";
        }
      });
      el.addEventListener("mouseleave", () => {
        cursor.classList.remove("hovering-card");
      });
    });
  };

  setupHoverListeners();
}

// Dynamic Dossier Renderer (`product.html`)
function renderProductDossier() {
  const dossierContainer = document.querySelector("#productDossierContainer");
  if (!dossierContainer) return;

  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id") || "1";
  const product = PRODUCTS.find(p => p.id === productId) || PRODUCTS[0];

  document.title = `${product.title} — MAVITAS Dossier`;

  dossierContainer.innerHTML = `
    <section class="product-dossier container">
      <div class="dossier-gallery">
        <div class="gallery-main-frame" id="mainGalleryFrame">
          <img id="mainGalleryImg" src="${product.image}" alt="${product.title}">
        </div>
        <div class="gallery-thumbs">
          ${product.thumbs.map((thumb, idx) => `
            <div class="thumb-item ${idx === 0 ? 'active' : ''}" onclick="changeGalleryImage('${thumb}', this)">
              <img src="${thumb}" alt="${product.title} view ${idx + 1}">
            </div>
          `).join('')}
        </div>
      </div>
      <div class="dossier-info">
        <div class="dossier-badges">
          <span class="dossier-badge">✓ Authenticated by MAVITAS</span>
          <span class="dossier-badge">✓ Verified Provenance</span>
          <span class="dossier-badge">${product.status}</span>
        </div>
        <div class="eyebrow">${product.categoryLabel} · REF ${product.serial}</div>
        <h1>${product.title}</h1>
        <div class="dossier-price">${formatMoney(product.price)}</div>
        <p style="color: var(--text-secondary); line-height: 1.8; margin-bottom: 24px; font-weight: 500;">
          ${product.description}
        </p>

        <button class="btn primary wide" onclick="addToCart('${product.id}')" style="margin-bottom: 32px; width: 100%;">
          Add to Collection — ${formatMoney(product.price)}
        </button>

        <div class="dossier-spec-table">
          <div class="spec-row"><span>Material</span><strong>${product.material}</strong></div>
          <div class="spec-row"><span>Condition</span><strong>${product.condition}</strong></div>
          <div class="spec-row"><span>Year of Manufacture</span><strong>${product.year}</strong></div>
          <div class="spec-row"><span>Origin</span><strong>${product.origin}</strong></div>
          <div class="spec-row"><span>Dimensions / Spec</span><strong>${product.dimensions}</strong></div>
          <div class="spec-row"><span>Delivery</span><strong>${product.delivery}</strong></div>
          <div class="spec-row"><span>Return Policy</span><strong>${product.returns}</strong></div>
        </div>
      </div>
    </section>
  `;
}

function changeGalleryImage(src, thumbEl) {
  const mainImg = document.querySelector("#mainGalleryImg");
  if (mainImg) {
    mainImg.style.opacity = "0.4";
    setTimeout(() => {
      mainImg.src = src;
      mainImg.style.opacity = "1";
    }, 150);
  }
  document.querySelectorAll(".thumb-item").forEach(el => el.classList.remove("active"));
  if (thumbEl) thumbEl.classList.add("active");
}

// Collection Filter & Sort Handler (`collection.html`)
function initCollectionPage() {
  const grid = document.querySelector("#collectionGrid");
  if (!grid) return;

  window.renderCollectionItems = function(category = 'all', sortBy = 'featured') {
    let list = [...PRODUCTS];

    if (category !== 'all') {
      list = list.filter(p => p.category === category);
    }

    if (sortBy === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'newest') {
      list.sort((a, b) => b.id - a.id);
    }

    const countEl = document.querySelector("#collectionCount");
    if (countEl) countEl.textContent = `${list.length} OBJECTS`;

    grid.innerHTML = list.map(item => `
      <a class="card" href="product.html?id=${item.id}">
        <div class="card-media">
          <img src="${item.image}" alt="${item.title}" loading="lazy">
          <span class="card-status-badge">${item.status}</span>
        </div>
        <div class="card-body">
          <div class="card-title">${item.title}</div>
          <div class="card-meta">
            <span class="verified-tag">✦ ${item.categoryLabel}</span>
            <span class="card-price">${formatMoney(item.price)}</span>
          </div>
        </div>
      </a>
    `).join('');

    initCustomCursor();
  };

  renderCollectionItems();
}

function filterCollection(cat, btnEl) {
  document.querySelectorAll(".filter-btn").forEach(el => el.classList.remove("active"));
  if (btnEl) btnEl.classList.add("active");
  const sortSelect = document.querySelector("#sortSelect");
  const sortBy = sortSelect ? sortSelect.value : 'featured';
  if (window.renderCollectionItems) {
    window.renderCollectionItems(cat, sortBy);
  }
}

function sortCollection(sortBy) {
  const activeFilter = document.querySelector(".filter-btn.active");
  const cat = activeFilter ? activeFilter.dataset.cat || 'all' : 'all';
  if (window.renderCollectionItems) {
    window.renderCollectionItems(cat, sortBy);
  }
}

// Checkout Page Renderer (`checkout.html`)
function renderCheckoutPage() {
  const container = document.querySelector("#checkoutItemsBox");
  const totalEl = document.querySelector("#checkoutTotalDisplay");
  if (!container) return;

  const cart = getCart();
  if (cart.length === 0) {
    container.innerHTML = `
      <div style="padding: 60px 20px; text-align: center; color: var(--text-secondary);">
        <p style="font-family: var(--font-serif); font-size: 24px;">Your acquisition list is empty.</p>
        <a class="link" href="collection.html" style="margin-top: 16px;">Browse Collection →</a>
      </div>
    `;
    if (totalEl) totalEl.textContent = formatMoney(0);
    return;
  }

  let total = 0;
  container.innerHTML = cart.map(item => {
    total += Number(item.price);
    return `
      <div class="receipt-row">
        <span>${item.title} <small style="color:var(--text-secondary)">(${item.categoryLabel})</small></span>
        <strong>${formatMoney(item.price)}</strong>
      </div>
    `;
  }).join('');

  if (totalEl) totalEl.textContent = formatMoney(total);
}

// Order Confirmation Page Renderer (`confirmation.html`)
function renderConfirmationPage() {
  const container = document.querySelector("#confirmationSummaryBox");
  if (!container) return;

  const urlParams = new URLSearchParams(window.location.search);
  const orderNum = urlParams.get("order") || "MV-" + Math.floor(10000 + Math.random() * 90000);
  const orderNumEl = document.querySelector("#orderNumberDisplay");
  if (orderNumEl) orderNumEl.textContent = orderNum;

  const lastCartItems = JSON.parse(sessionStorage.getItem("last_order_items") || "[]");
  if (lastCartItems.length === 0) {
    container.innerHTML = `<div class="receipt-row"><span>Atelier Chronograph</span><strong>₹8,40,000</strong></div>`;
    return;
  }

  let total = 0;
  container.innerHTML = lastCartItems.map(item => {
    total += Number(item.price);
    return `
      <div class="receipt-row">
        <span>${item.title}</span>
        <strong>${formatMoney(item.price)}</strong>
      </div>
    `;
  }).join('') + `
    <div class="receipt-row" style="border-top: 1px solid var(--border-line); margin-top: 14px; padding-top: 14px; font-weight: 600;">
      <span>Total Paid</span>
      <strong style="font-family: var(--font-label); font-size: 16px;">${formatMoney(total)}</strong>
    </div>
  `;
}

// Smooth Page Transitions
function initPageTransitions() {
  document.querySelectorAll("a[href]").forEach(link => {
    const href = link.getAttribute("href");
    if (href && !href.startsWith("#") && !href.startsWith("javascript") && !href.startsWith("mailto") && !href.startsWith("tel") && !link.target) {
      link.addEventListener("click", (e) => {
        if (e.ctrlKey || e.metaKey) return;
        e.preventDefault();
        document.body.classList.add("page-transitioning");
        setTimeout(() => {
          window.location.href = href;
        }, 350);
      });
    }
  });
}

// Initialize Everything on DOM Ready
document.addEventListener("DOMContentLoaded", () => {
  initDrawer();
  initCustomCursor();
  initPageTransitions();
  renderProductDossier();
  initCollectionPage();
  renderConfirmationPage();

  const checkoutForm = document.querySelector("#checkoutForm");
  if (checkoutForm) {
    checkoutForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const cart = getCart();
      if (cart.length === 0) {
        alert("Your collection is currently empty.");
        return;
      }
      sessionStorage.setItem("last_order_items", JSON.stringify(cart));
      clearCart();
      const randomOrder = "MV-" + Math.floor(10000 + Math.random() * 90000);
      window.location.href = `confirmation.html?order=${randomOrder}`;
    });
  }

  document.querySelectorAll("form[data-demo]").forEach(form => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Request received. A MAVITAS private specialist will contact you directly.");
      form.reset();
    });
  });
});
