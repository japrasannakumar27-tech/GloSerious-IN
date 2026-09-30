/**
 * GLOSERIOUSIN - Shopping Bag & Cart State Management
 */

const Cart = {
  items: [],
  FREE_SHIPPING_THRESHOLD: 50,
  SHIPPING_FLAT_RATE: 6.00,

  init() {
    this.loadFromStorage();
    this.render();
    this.bindEvents();
  },

  loadFromStorage() {
    try {
      const stored = localStorage.getItem('gloseriousin_cart');
      if (stored) {
        this.items = JSON.parse(stored);
      } else {
        // Pre-populate with 1 starter item so the cart feels rich immediately!
        this.items = [
          {
            id: 'dew-glow-serum',
            quantity: 1,
            addedAt: Date.now()
          }
        ];
        this.saveToStorage();
      }
    } catch (e) {
      console.warn('Storage unavailable:', e);
      this.items = [];
    }
  },

  saveToStorage() {
    try {
      localStorage.setItem('gloseriousin_cart', JSON.stringify(this.items));
    } catch (e) {
      console.warn('Could not save cart:', e);
    }
  },

  addItem(productId, qty = 1) {
    const product = GLOSERIOUSIN_DATA.products.find(p => p.id === productId);
    if (!product) return;

    const existingIndex = this.items.findIndex(item => item.id === productId);
    if (existingIndex > -1) {
      this.items[existingIndex].quantity += qty;
    } else {
      this.items.push({
        id: productId,
        quantity: qty,
        addedAt: Date.now()
      });
    }

    this.saveToStorage();
    this.render();
    this.openDrawer();
    App.showToast(`Added ${product.name} to your bag`);
  },

  updateQuantity(productId, newQty) {
    if (newQty <= 0) {
      this.removeItem(productId);
      return;
    }
    const item = this.items.find(i => i.id === productId);
    if (item) {
      item.quantity = newQty;
      this.saveToStorage();
      this.render();
    }
  },

  removeItem(productId) {
    const product = GLOSERIOUSIN_DATA.products.find(p => p.id === productId);
    this.items = this.items.filter(i => i.id !== productId);
    this.saveToStorage();
    this.render();
    if (product) {
      App.showToast(`Removed ${product.name} from bag`);
    }
  },

  calculate() {
    let subtotal = 0;
    let count = 0;

    this.items.forEach(item => {
      const product = GLOSERIOUSIN_DATA.products.find(p => p.id === item.id);
      if (product) {
        subtotal += product.price * item.quantity;
        count += item.quantity;
      }
    });

    const isFreeShipping = subtotal >= this.FREE_SHIPPING_THRESHOLD;
    const shipping = subtotal === 0 ? 0 : (isFreeShipping ? 0 : this.SHIPPING_FLAT_RATE);
    const amountAway = Math.max(0, this.FREE_SHIPPING_THRESHOLD - subtotal);
    const progressPercent = Math.min(100, (subtotal / this.FREE_SHIPPING_THRESHOLD) * 100);
    const total = subtotal + shipping;

    return {
      subtotal,
      count,
      shipping,
      isFreeShipping,
      amountAway,
      progressPercent,
      total
    };
  },

  render() {
    const calc = this.calculate();

    // Update Header Badges
    const bagBadges = document.querySelectorAll('.cart-count-badge');
    bagBadges.forEach(badge => {
      badge.textContent = calc.count;
      badge.style.display = calc.count > 0 ? 'flex' : 'none';
    });

    // Update Drawer Header Count
    const drawerCountEl = document.getElementById('cartDrawerCount');
    if (drawerCountEl) {
      drawerCountEl.textContent = `(${calc.count} ${calc.count === 1 ? 'item' : 'items'})`;
    }

    // Update Free Shipping Progress Bar & Message
    const shippingMsgEl = document.getElementById('freeShippingMsg');
    const shippingBarEl = document.getElementById('freeShippingBar');
    if (shippingMsgEl && shippingBarEl) {
      if (calc.count === 0) {
        shippingMsgEl.innerHTML = `Add items to qualify for <strong>free shipping</strong>`;
        shippingBarEl.style.width = '0%';
        shippingBarEl.classList.remove('is-qualified');
      } else if (calc.isFreeShipping) {
        shippingMsgEl.innerHTML = `✨ <strong>You've unlocked free standard shipping!</strong>`;
        shippingBarEl.style.width = '100%';
        shippingBarEl.classList.add('is-qualified');
      } else {
        shippingMsgEl.innerHTML = `You're <strong>$${calc.amountAway.toFixed(2)}</strong> away from free shipping.`;
        shippingBarEl.style.width = `${calc.progressPercent}%`;
        shippingBarEl.classList.remove('is-qualified');
      }
    }

    // Update Items List
    const itemsListEl = document.getElementById('cartItemsList');
    if (itemsListEl) {
      if (this.items.length === 0) {
        itemsListEl.innerHTML = `
          <div class="cart-empty-message">
            <h4>Your Bag Is Empty</h4>
            <p>Thoughtfully formulated essentials await your daily ritual.</p>
            <button class="btn btn-primary" style="margin-top: 1.5rem;" onclick="App.navigateTo('shop'); Cart.closeDrawer();">Explore Collection</button>
          </div>
        `;
      } else {
        itemsListEl.innerHTML = this.items.map(item => {
          const product = GLOSERIOUSIN_DATA.products.find(p => p.id === item.id);
          if (!product) return '';
          return `
            <div class="cart-item">
              <div class="cart-item-image">
                <img src="${product.image}" alt="${product.name}" />
              </div>
              <div class="cart-item-info">
                <h4 class="cart-item-name">${product.name}</h4>
                <div class="cart-item-meta">${product.subCategory} • ${product.size}</div>
                <div class="cart-item-bottom">
                  <div class="cart-qty-stepper">
                    <button class="cart-qty-btn" onclick="Cart.updateQuantity('${item.id}', ${item.quantity - 1})">−</button>
                    <span class="cart-qty-input">${item.quantity}</span>
                    <button class="cart-qty-btn" onclick="Cart.updateQuantity('${item.id}', ${item.quantity + 1})">+</button>
                  </div>
                  <div class="cart-item-price">$${(product.price * item.quantity).toFixed(2)}</div>
                  <button class="cart-item-remove" onclick="Cart.removeItem('${item.id}')">Remove</button>
                </div>
              </div>
            </div>
          `;
        }).join('');
      }
    }

    // Update Summary Values
    const subtotalEl = document.getElementById('cartSubtotal');
    const shippingEl = document.getElementById('cartShipping');
    const totalEl = document.getElementById('cartTotal');
    const checkoutBtn = document.getElementById('cartCheckoutBtn');

    if (subtotalEl) subtotalEl.textContent = `$${calc.subtotal.toFixed(2)}`;
    if (shippingEl) shippingEl.textContent = calc.shipping === 0 ? (calc.subtotal > 0 ? 'FREE' : '$0.00') : `$${calc.shipping.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `$${calc.total.toFixed(2)}`;
    if (checkoutBtn) checkoutBtn.disabled = this.items.length === 0;
  },

  openDrawer() {
    const drawer = document.getElementById('cartDrawer');
    const backdrop = document.getElementById('modalBackdrop');
    if (drawer && backdrop) {
      drawer.classList.add('is-open');
      backdrop.classList.add('is-active');
      document.body.style.overflow = 'hidden';
    }
  },

  closeDrawer() {
    const drawer = document.getElementById('cartDrawer');
    const backdrop = document.getElementById('modalBackdrop');
    if (drawer && backdrop) {
      drawer.classList.remove('is-open');
      if (!document.querySelector('.is-open, .is-active:not(#modalBackdrop)')) {
        backdrop.classList.remove('is-active');
        document.body.style.overflow = '';
      }
    }
  },

  bindEvents() {
    // Bag trigger buttons
    document.querySelectorAll('.open-cart-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.openDrawer();
      });
    });

    // Close buttons
    const closeBtn = document.getElementById('closeCartBtn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeDrawer());
    }

    const continueBtn = document.getElementById('continueShoppingBtn');
    if (continueBtn) {
      continueBtn.addEventListener('click', () => this.closeDrawer());
    }
  }
};
