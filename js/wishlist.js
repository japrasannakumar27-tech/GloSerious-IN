/**
 * GLOSERIOUSIN - Wishlist State Management
 */

const Wishlist = {
  items: [],

  init() {
    this.loadFromStorage();
    this.render();
    this.bindEvents();
  },

  loadFromStorage() {
    try {
      const stored = localStorage.getItem('gloseriousin_wishlist');
      if (stored) {
        this.items = JSON.parse(stored);
      } else {
        this.items = ['radiance-oil']; // Starter saved item
        this.saveToStorage();
      }
    } catch (e) {
      this.items = [];
    }
  },

  saveToStorage() {
    try {
      localStorage.setItem('gloseriousin_wishlist', JSON.stringify(this.items));
    } catch (e) {
      console.warn('Could not save wishlist:', e);
    }
  },

  toggle(productId) {
    const product = GLOSERIOUSIN_DATA.products.find(p => p.id === productId);
    const index = this.items.indexOf(productId);
    if (index > -1) {
      this.items.splice(index, 1);
      App.showToast(`Removed ${product ? product.name : 'item'} from wishlist`);
    } else {
      this.items.push(productId);
      App.showToast(`Saved ${product ? product.name : 'item'} to your wishlist`);
    }
    this.saveToStorage();
    this.render();
    this.updateCardHearts();
  },

  has(productId) {
    return this.items.includes(productId);
  },

  moveToCart(productId) {
    Cart.addItem(productId, 1);
    this.items = this.items.filter(id => id !== productId);
    this.saveToStorage();
    this.render();
    this.updateCardHearts();
  },

  render() {
    // Update Wishlist Badges
    const badges = document.querySelectorAll('.wishlist-count-badge');
    badges.forEach(badge => {
      badge.textContent = this.items.length;
      badge.style.display = this.items.length > 0 ? 'flex' : 'none';
    });

    const listEl = document.getElementById('wishlistItemsList');
    if (!listEl) return;

    if (this.items.length === 0) {
      listEl.innerHTML = `
        <div class="cart-empty-message">
          <h4>Your Wishlist Is Empty</h4>
          <p>Tap the heart icon on any product to curate your personal glow collection.</p>
        </div>
      `;
      return;
    }

    listEl.innerHTML = this.items.map(id => {
      const product = GLOSERIOUSIN_DATA.products.find(p => p.id === id);
      if (!product) return '';
      return `
        <div class="cart-item">
          <div class="cart-item-image">
            <img src="${product.image}" alt="${product.name}" />
          </div>
          <div class="cart-item-info">
            <h4 class="cart-item-name">${product.name}</h4>
            <div class="cart-item-meta">${product.category} • $${product.price}</div>
            <div class="cart-item-bottom">
              <button class="btn btn-primary" style="height: 34px; padding: 0 14px; font-size: 0.6875rem;" onclick="Wishlist.moveToCart('${product.id}')">Add to Bag</button>
              <button class="cart-item-remove" onclick="Wishlist.toggle('${product.id}')">Remove</button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  },

  updateCardHearts() {
    document.querySelectorAll('.wishlist-btn[data-product-id]').forEach(btn => {
      const pid = btn.getAttribute('data-product-id');
      if (this.has(pid)) {
        btn.classList.add('is-active');
      } else {
        btn.classList.remove('is-active');
      }
    });

    // Also update PDP wishlist button if visible
    const pdpWishlistBtn = document.getElementById('pdpWishlistBtn');
    if (pdpWishlistBtn) {
      const pid = pdpWishlistBtn.getAttribute('data-product-id');
      if (this.has(pid)) {
        pdpWishlistBtn.classList.add('is-active');
        pdpWishlistBtn.innerHTML = `♥ IN YOUR WISHLIST`;
      } else {
        pdpWishlistBtn.classList.remove('is-active');
        pdpWishlistBtn.innerHTML = `♡ ADD TO WISHLIST`;
      }
    }
  },

  openDrawer() {
    const drawer = document.getElementById('wishlistDrawer');
    const backdrop = document.getElementById('modalBackdrop');
    if (drawer && backdrop) {
      drawer.classList.add('is-open');
      backdrop.classList.add('is-active');
      document.body.style.overflow = 'hidden';
    }
  },

  closeDrawer() {
    const drawer = document.getElementById('wishlistDrawer');
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
    document.querySelectorAll('.open-wishlist-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.openDrawer();
      });
    });

    const closeBtn = document.getElementById('closeWishlistBtn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeDrawer());
    }
  }
};
