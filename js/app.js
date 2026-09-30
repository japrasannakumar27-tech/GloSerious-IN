/**
 * GLOSERIOUSIN - Main Application Controller
 */

const App = {
  currentCategoryFilter: 'all',
  currentSort: 'featured',

  init() {
    this.renderHomeCategories();
    this.renderBestSellers();
    this.renderTestimonials();
    this.renderJournal();
    this.renderInstagram();
    this.renderShopProducts();
    this.bindBackdrop();
    this.bindSearch();
    this.bindQuickView();
    this.bindCheckout();
    this.bindNewsletter();

    // Initialize sub-modules
    Cart.init();
    Wishlist.init();
    Navigation.init();
  },

  navigateTo(view, param = null) {
    if (view === 'shop') {
      window.location.hash = 'shop';
    } else if (view === 'home') {
      window.location.hash = 'home';
    } else if (view === 'product') {
      window.location.hash = `product-${param}`;
    }
  },

  // ------------------------------------------------------------------------
  // HOME RENDERING
  // ------------------------------------------------------------------------
  renderHomeCategories() {
    const grid = document.getElementById('categoryGrid');
    if (!grid) return;

    grid.innerHTML = GLOSERIOUSIN_DATA.categories.map(cat => `
      <div class="category-card" onclick="App.filterCategoryAndGo('${cat.id}')">
        <div class="category-card-media">
          <img src="${cat.image}" alt="${cat.name}" loading="lazy" />
          <div class="category-card-overlay"></div>
        </div>
        <div class="category-card-content">
          <div>
            <h3 class="category-card-name">${cat.name}</h3>
            <span class="category-card-tagline">${cat.tagline}</span>
          </div>
          <div class="category-card-action">
            <span>Discover</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </div>
        </div>
      </div>
    `).join('');
  },

  renderBestSellers() {
    const grid = document.getElementById('bestSellersGrid');
    if (!grid) return;

    // Filter to best sellers (Dew Glow Serum, Cloud Cream, Rose Veil Mist, Radiance Oil)
    const bestSellers = GLOSERIOUSIN_DATA.products.filter(p => p.isBestSeller).slice(0, 4);
    grid.innerHTML = bestSellers.map(p => this.createProductCardHtml(p)).join('');
    Wishlist.updateCardHearts();
  },

  createProductCardHtml(product) {
    const isWishlisted = Wishlist.has(product.id);
    return `
      <div class="product-card" data-product-id="${product.id}">
        <div class="product-media" onclick="App.navigateTo('product', '${product.id}')">
          <img src="${product.image}" alt="${product.name}" loading="lazy" />
          <div class="product-badge-list">
            ${product.tag ? `<span class="badge badge-rose">${product.tag}</span>` : ''}
          </div>
          <button class="wishlist-btn ${isWishlisted ? 'is-active' : ''}" 
                  data-product-id="${product.id}"
                  onclick="event.stopPropagation(); Wishlist.toggle('${product.id}')"
                  title="Add to wishlist" 
                  aria-label="Wishlist">
            <svg viewBox="0 0 24 24" fill="${isWishlisted ? 'currentColor' : 'none'}" stroke="currentColor">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>
          <div class="product-quick-view-btn" onclick="event.stopPropagation(); App.openQuickView('${product.id}')">
            Quick View
          </div>
        </div>
        <div class="product-info">
          <span class="product-category">${product.category}</span>
          <h4 class="product-title" onclick="App.navigateTo('product', '${product.id}')">${product.brandName || product.name}</h4>
          <p class="product-description-short">${product.shortDescription}</p>
          <div class="product-meta-row">
            <div class="star-rating">
              ★★★★★ <span class="rating-score">${product.rating}</span>
            </div>
            <span class="product-price">$${product.price.toFixed(2)}</span>
          </div>
          <button class="btn btn-primary product-add-btn" onclick="Cart.addItem('${product.id}', 1)">
            Add To Bag
          </button>
        </div>
      </div>
    `;
  },

  renderTestimonials() {
    const grid = document.getElementById('testimonialsGrid');
    if (!grid) return;

    grid.innerHTML = GLOSERIOUSIN_DATA.testimonials.map(t => `
      <div class="testimonial-card">
        <div class="testimonial-stars">★★★★★</div>
        <p class="testimonial-quote">"${t.text}"</p>
        <div class="testimonial-author-row">
          <span class="testimonial-author-name">— ${t.author}</span>
          <span class="testimonial-verified">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            Verified Customer
          </span>
        </div>
      </div>
    `).join('');
  },

  renderJournal() {
    const grid = document.getElementById('journalGrid');
    if (!grid) return;

    grid.innerHTML = GLOSERIOUSIN_DATA.journalArticles.map(art => `
      <article class="journal-card" onclick="App.showToast('Opening article: ${art.title}')">
        <div class="journal-media">
          <img src="${art.image}" alt="${art.title}" loading="lazy" />
        </div>
        <span class="journal-category">${art.category} • ${art.readTime}</span>
        <h3 class="journal-title">${art.title}</h3>
        <p class="journal-excerpt">${art.excerpt}</p>
        <div class="btn-text">Read Article</div>
      </article>
    `).join('');
  },

  renderInstagram() {
    const grid = document.getElementById('instagramGrid');
    if (!grid) return;

    grid.innerHTML = GLOSERIOUSIN_DATA.instagramFeed.map(feed => `
      <div class="social-item" onclick="App.showToast('Follow @GLOSERIOUSIN on Instagram')">
        <img src="${feed.image}" alt="GLOSERIOUSIN ritual aesthetic" loading="lazy" />
        <div class="social-item-overlay">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
          </svg>
        </div>
      </div>
    `).join('');
  },

  // ------------------------------------------------------------------------
  // SHOP ALL PAGE & FILTERING
  // ------------------------------------------------------------------------
  filterCategoryAndGo(catId) {
    this.currentCategoryFilter = catId;
    window.location.hash = `category-${catId}`;
  },

  filterCategory(catId) {
    this.currentCategoryFilter = catId;
    document.querySelectorAll('.filter-pill').forEach(btn => {
      if (btn.getAttribute('data-category') === catId) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
    this.renderShopProducts();
  },

  sortProducts(sortVal) {
    this.currentSort = sortVal;
    this.renderShopProducts();
  },

  renderShopProducts() {
    const grid = document.getElementById('shopProductsGrid');
    const counter = document.getElementById('shopCountDisplay');
    if (!grid) return;

    let list = [...GLOSERIOUSIN_DATA.products];

    // Category Filter
    if (this.currentCategoryFilter && this.currentCategoryFilter !== 'all') {
      if (this.currentCategoryFilter === 'newarrivals') {
        list = list.filter(p => p.isNew);
      } else {
        list = list.filter(p => p.categorySlug.toLowerCase() === this.currentCategoryFilter.toLowerCase());
      }
    }

    // Sort
    if (this.currentSort === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (this.currentSort === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (this.currentSort === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }

    if (counter) {
      counter.textContent = `Showing ${list.length} ${list.length === 1 ? 'essential' : 'essentials'}`;
    }

    if (list.length === 0) {
      grid.innerHTML = `
        <div class="shop-empty-state" style="grid-column: 1 / -1;">
          <h3>No Formulas Found</h3>
          <p>Try selecting another ritual category above.</p>
        </div>
      `;
    } else {
      grid.innerHTML = list.map(p => this.createProductCardHtml(p)).join('');
      Wishlist.updateCardHearts();
    }
  },

  // ------------------------------------------------------------------------
  // QUICK VIEW MODAL
  // ------------------------------------------------------------------------
  bindQuickView() {
    const closeBtn = document.getElementById('quickViewClose');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeQuickView());
    }
  },

  openQuickView(productId) {
    const product = GLOSERIOUSIN_DATA.products.find(p => p.id === productId);
    if (!product) return;

    const modal = document.getElementById('quickViewModal');
    const bodyEl = document.getElementById('quickViewBody');
    const backdrop = document.getElementById('modalBackdrop');

    if (bodyEl) {
      bodyEl.innerHTML = `
        <div style="display: grid; grid-template-columns: 1fr 1.2fr; gap: 2rem; align-items: center;">
          <div style="border-radius: var(--radius-sm); overflow: hidden; background: #FAF6F1; border: 1px solid var(--color-light-border);">
            <img src="${product.image}" alt="${product.name}" style="width: 100%; aspect-ratio: 1/1; object-fit: cover;" />
          </div>
          <div>
            <span style="font-size: 0.75rem; letter-spacing: 1.5px; text-transform: uppercase; color: var(--color-muted-rose); font-weight: 600;">${product.subCategory || product.category}</span>
            <h3 style="font-size: 1.75rem; margin: 6px 0 10px 0;">${product.name}</h3>
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 1rem;">
              <span class="star-rating">★★★★★</span>
              <span style="font-size: 0.8125rem; color: var(--color-espresso-muted);">${product.rating} (${product.reviewCount} reviews)</span>
            </div>
            <div style="font-size: 1.375rem; font-weight: 600; margin-bottom: 1rem;">$${product.price.toFixed(2)}</div>
            <p style="font-size: 0.9375rem; line-height: 1.6; margin-bottom: 1.5rem; color: var(--color-espresso-muted);">${product.shortDescription}</p>
            <div style="display: flex; gap: 10px; margin-bottom: 1rem;">
              <button class="btn btn-primary" style="flex: 1;" onclick="Cart.addItem('${product.id}', 1); App.closeQuickView();">Add To Bag</button>
              <button class="btn btn-secondary" onclick="App.navigateTo('product', '${product.id}'); App.closeQuickView();">Full Details</button>
            </div>
          </div>
        </div>
      `;
    }

    if (modal && backdrop) {
      modal.classList.add('is-open');
      backdrop.classList.add('is-active');
      document.body.style.overflow = 'hidden';
    }
  },

  closeQuickView() {
    const modal = document.getElementById('quickViewModal');
    const backdrop = document.getElementById('modalBackdrop');
    if (modal && backdrop) {
      modal.classList.remove('is-open');
      backdrop.classList.remove('is-active');
      document.body.style.overflow = '';
    }
  },

  // ------------------------------------------------------------------------
  // SEARCH MODAL
  // ------------------------------------------------------------------------
  bindSearch() {
    const openBtns = document.querySelectorAll('.open-search-btn');
    const closeBtn = document.getElementById('searchCloseBtn');
    const input = document.getElementById('searchInput');

    openBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.openSearch();
      });
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeSearch());
    }

    if (input) {
      input.addEventListener('input', (e) => {
        this.handleSearch(e.target.value);
      });
    }
  },

  openSearch() {
    const modal = document.getElementById('searchModal');
    const backdrop = document.getElementById('modalBackdrop');
    const input = document.getElementById('searchInput');
    if (modal && backdrop) {
      modal.classList.add('is-open');
      backdrop.classList.add('is-active');
      document.body.style.overflow = 'hidden';
      setTimeout(() => input && input.focus(), 150);
      this.handleSearch('');
    }
  },

  closeSearch() {
    const modal = document.getElementById('searchModal');
    const backdrop = document.getElementById('modalBackdrop');
    if (modal && backdrop) {
      modal.classList.remove('is-open');
      backdrop.classList.remove('is-active');
      document.body.style.overflow = '';
    }
  },

  handleSearch(query) {
    const resultsContainer = document.getElementById('searchResultsGrid');
    if (!resultsContainer) return;

    const q = query.trim().toLowerCase();
    const matches = GLOSERIOUSIN_DATA.products.filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.category.toLowerCase().includes(q) ||
      p.shortDescription.toLowerCase().includes(q)
    );

    if (matches.length === 0) {
      resultsContainer.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 2rem; color: var(--color-espresso-muted);">
          No skincare or beauty matches found for "${query}".
        </div>
      `;
    } else {
      resultsContainer.innerHTML = matches.slice(0, 3).map(p => this.createProductCardHtml(p)).join('');
      Wishlist.updateCardHearts();
    }
  },

  // ------------------------------------------------------------------------
  // CHECKOUT MODAL
  // ------------------------------------------------------------------------
  bindCheckout() {
    const checkoutBtn = document.getElementById('cartCheckoutBtn');
    const modal = document.getElementById('checkoutModal');
    const closeBtn = document.getElementById('checkoutCloseBtn');
    const form = document.getElementById('checkoutForm');

    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', () => {
        Cart.closeDrawer();
        this.openCheckout();
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeCheckout());
    }

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const calc = Cart.calculate();
        modal.innerHTML = `
          <div style="text-align: center; padding: 3rem 1rem;">
            <div style="width: 64px; height: 64px; background: var(--color-warm-ivory); border: 1px solid var(--color-muted-rose); border-radius: 50%; color: var(--color-muted-rose); display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem auto; font-size: 1.75rem;">✓</div>
            <span style="font-size: 0.75rem; letter-spacing: 2px; text-transform: uppercase; color: var(--color-muted-rose); font-weight: 600;">THANK YOU FOR YOUR ORDER</span>
            <h3 style="font-family: var(--font-serif); font-size: 2.25rem; margin: 8px 0 16px 0;">Your Glow Ritual Is On Its Way</h3>
            <p style="color: var(--color-espresso-muted); max-width: 480px; margin: 0 auto 2rem auto; font-size: 0.9375rem; line-height: 1.6;">
              Order confirmation <strong>#GLO-2026-${Math.floor(10000 + Math.random() * 90000)}</strong> has been sent to your email. We're carefully boxing your freshly prepared botanical formulations with compostable silk wrapping.
            </p>
            <div style="background: var(--color-warm-ivory); padding: 1.25rem; border-radius: var(--radius-sm); max-width: 400px; margin: 0 auto 2rem auto; font-size: 0.875rem; text-align: left; border: 1px solid var(--color-light-border);">
              <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
                <span>Total Paid:</span>
                <strong>$${calc.total.toFixed(2)}</strong>
              </div>
              <div style="display: flex; justify-content: space-between; color: var(--color-success-green);">
                <span>Shipping:</span>
                <span>${calc.shipping === 0 ? 'Complimentary Standard' : '$6.00'}</span>
              </div>
            </div>
            <button class="btn btn-primary" onclick="Cart.items = []; Cart.saveToStorage(); Cart.render(); App.closeCheckout(); window.location.reload();">Back To Boutique</button>
          </div>
        `;
      });
    }
  },

  openCheckout() {
    const modal = document.getElementById('checkoutModal');
    const backdrop = document.getElementById('modalBackdrop');
    const calc = Cart.calculate();
    
    // Update summary preview
    const checkoutSubtotal = document.getElementById('checkoutSubtotal');
    const checkoutTotal = document.getElementById('checkoutTotal');
    if (checkoutSubtotal) checkoutSubtotal.textContent = `$${calc.subtotal.toFixed(2)}`;
    if (checkoutTotal) checkoutTotal.textContent = `$${calc.total.toFixed(2)}`;

    if (modal && backdrop) {
      modal.classList.add('is-open');
      backdrop.classList.add('is-active');
      document.body.style.overflow = 'hidden';
    }
  },

  closeCheckout() {
    const modal = document.getElementById('checkoutModal');
    const backdrop = document.getElementById('modalBackdrop');
    if (modal && backdrop) {
      modal.classList.remove('is-open');
      backdrop.classList.remove('is-active');
      document.body.style.overflow = '';
    }
  },

  // ------------------------------------------------------------------------
  // NEWSLETTER HANDLER
  // ------------------------------------------------------------------------
  bindNewsletter() {
    const form = document.getElementById('newsletterForm');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = document.getElementById('newsletterEmail');
        if (input && input.value) {
          this.showToast('Welcome to the GLOSERIOUSIN community!');
          input.value = '';
        }
      });
    }
  },

  // ------------------------------------------------------------------------
  // UNIVERSAL BACKDROP
  // ------------------------------------------------------------------------
  bindBackdrop() {
    const backdrop = document.getElementById('modalBackdrop');
    if (backdrop) {
      backdrop.addEventListener('click', () => {
        Cart.closeDrawer();
        Wishlist.closeDrawer();
        Navigation.closeMobileDrawer();
        this.closeQuickView();
        this.closeSearch();
        this.closeCheckout();
      });
    }
  },

  // ------------------------------------------------------------------------
  // TOAST SYSTEM
  // ------------------------------------------------------------------------
  showToast(message) {
    let container = document.getElementById('toastContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toastContainer';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <div class="toast-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      </div>
      <div>${message}</div>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('toast-hiding');
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, 2800);
  }
};

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
