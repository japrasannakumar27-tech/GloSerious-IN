/**
 * GLOSERIOUSIN - Product Detail Page Controller
 */

const PDP = {
  currentProduct: null,
  currentQuantity: 1,

  renderProduct(productId) {
    const product = GLOSERIOUSIN_DATA.products.find(p => p.id === productId);
    if (!product) return;

    this.currentProduct = product;
    this.currentQuantity = 1;

    // Breadcrumbs
    const breadcrumbCat = document.getElementById('pdpBreadcrumbCategory');
    const breadcrumbName = document.getElementById('pdpBreadcrumbName');
    if (breadcrumbCat) breadcrumbCat.textContent = product.category;
    if (breadcrumbName) breadcrumbName.textContent = product.name;

    // Main Gallery Image & Thumbnails
    const mainImgEl = document.getElementById('pdpMainImage');
    const thumbContainer = document.getElementById('pdpThumbnails');
    if (mainImgEl) {
      mainImgEl.src = product.image;
      mainImgEl.alt = product.name;
    }

    if (thumbContainer) {
      const gallery = product.gallery && product.gallery.length ? product.gallery : [product.image];
      thumbContainer.innerHTML = gallery.map((imgSrc, idx) => `
        <div class="pdp-thumb-item ${idx === 0 ? 'is-active' : ''}" onclick="PDP.switchImage('${imgSrc}', this)">
          <img src="${imgSrc}" alt="${product.name} view ${idx + 1}" />
        </div>
      `).join('');
    }

    // Right Column Info
    const catEl = document.getElementById('pdpCategory');
    const titleEl = document.getElementById('pdpTitle');
    const ratingScoreEl = document.getElementById('pdpRatingScore');
    const reviewCountEl = document.getElementById('pdpReviewCount');
    const priceEl = document.getElementById('pdpPrice');
    const descEl = document.getElementById('pdpDescription');
    const sizeEl = document.getElementById('pdpSize');
    const qtyInput = document.getElementById('pdpQtyInput');
    const wishlistBtn = document.getElementById('pdpWishlistBtn');

    if (catEl) catEl.textContent = product.subCategory || product.category;
    if (titleEl) titleEl.textContent = product.name;
    if (ratingScoreEl) ratingScoreEl.textContent = product.rating;
    if (reviewCountEl) reviewCountEl.textContent = `(${product.reviewCount} Reviews)`;
    if (priceEl) priceEl.textContent = `$${product.price.toFixed(2)}`;
    if (descEl) descEl.textContent = product.shortDescription;
    if (sizeEl) sizeEl.textContent = product.size;
    if (qtyInput) qtyInput.value = '1';

    if (wishlistBtn) {
      wishlistBtn.setAttribute('data-product-id', product.id);
      Wishlist.updateCardHearts();
    }

    // Accordions
    const descAccBody = document.getElementById('accDescriptionBody');
    const benefitsAccBody = document.getElementById('accBenefitsBody');
    const ingredientsAccBody = document.getElementById('accIngredientsBody');
    const howToUseAccBody = document.getElementById('accHowToUseBody');
    const reviewsAccBody = document.getElementById('accReviewsBody');

    if (descAccBody) descAccBody.innerHTML = `<p>${product.description}</p>`;
    if (benefitsAccBody) {
      benefitsAccBody.innerHTML = `
        <ul>
          ${product.benefits.map(b => `<li>${b}</li>`).join('')}
        </ul>
      `;
    }
    if (ingredientsAccBody) {
      ingredientsAccBody.innerHTML = `<p style="font-size: 0.875rem; line-height: 1.6;">${product.ingredients}</p>`;
    }
    if (howToUseAccBody) {
      howToUseAccBody.innerHTML = `<p>${product.howToUse}</p>`;
    }
    if (reviewsAccBody) {
      reviewsAccBody.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 1.25rem;">
          <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--color-light-border); padding-bottom: 1rem;">
            <div>
              <div class="star-rating">★★★★★ <span class="rating-score">${product.rating} / 5.0</span></div>
              <p style="font-size: 0.8125rem; margin-top: 4px;">Based on ${product.reviewCount} customer reviews</p>
            </div>
            <button class="btn btn-secondary" style="height: 36px; padding: 0 16px; font-size: 0.75rem;" onclick="App.showToast('Review form opened')">Write A Review</button>
          </div>
          <div style="font-size: 0.875rem;">
            <div style="margin-bottom: 4px; color: #D4AF37;">★★★★★</div>
            <strong>"Holy grail for daily glow"</strong>
            <p style="margin: 4px 0;">"Literally transforms my dry skin within 2 days. The texture is unmatched."</p>
            <small style="color: var(--color-espresso-subtle);">— Camille T. (Verified Buyer)</small>
          </div>
          <div style="font-size: 0.875rem;">
            <div style="margin-bottom: 4px; color: #D4AF37;">★★★★★</div>
            <strong>"Perfection in every drop"</strong>
            <p style="margin: 4px 0;">"The aesthetic packaging is gorgeous on my bathroom vanity, but the formula inside is even better."</p>
            <small style="color: var(--color-espresso-subtle);">— Alexandra P. (Verified Buyer)</small>
          </div>
        </div>
      `;
    }

    // Reset Accordion states (first accordion open, others closed)
    document.querySelectorAll('.pdp-accordion-item').forEach((item, idx) => {
      const body = item.querySelector('.pdp-accordion-body');
      if (idx === 0) {
        item.classList.add('is-open');
        if (body) body.style.maxHeight = body.scrollHeight + 100 + 'px';
      } else {
        item.classList.remove('is-open');
        if (body) body.style.maxHeight = '0px';
      }
    });

    // Render "Pairs Beautifully With"
    this.renderPairsWith(product);

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  switchImage(src, thumbElement) {
    const mainImgEl = document.getElementById('pdpMainImage');
    if (mainImgEl) {
      mainImgEl.style.opacity = '0.5';
      setTimeout(() => {
        mainImgEl.src = src;
        mainImgEl.style.opacity = '1';
      }, 150);
    }
    document.querySelectorAll('.pdp-thumb-item').forEach(el => el.classList.remove('is-active'));
    if (thumbElement) thumbElement.classList.add('is-active');
  },

  updateQuantity(delta) {
    this.currentQuantity = Math.max(1, this.currentQuantity + delta);
    const input = document.getElementById('pdpQtyInput');
    if (input) input.value = this.currentQuantity;
  },

  addToBag() {
    if (!this.currentProduct) return;
    Cart.addItem(this.currentProduct.id, this.currentQuantity);
  },

  renderPairsWith(product) {
    const container = document.getElementById('pairsWithGrid');
    if (!container) return;

    const pairIds = product.pairsWith || [];
    const pairProducts = GLOSERIOUSIN_DATA.products.filter(p => pairIds.includes(p.id));

    if (pairProducts.length === 0) {
      container.parentElement.style.display = 'none';
      return;
    }

    container.parentElement.style.display = 'block';
    container.innerHTML = pairProducts.map(p => App.createProductCardHtml(p)).join('');
  },

  toggleAccordion(headerElement) {
    const item = headerElement.closest('.pdp-accordion-item');
    const body = item.querySelector('.pdp-accordion-body');
    const isOpen = item.classList.contains('is-open');

    if (isOpen) {
      item.classList.remove('is-open');
      body.style.maxHeight = '0px';
    } else {
      item.classList.add('is-open');
      body.style.maxHeight = body.scrollHeight + 200 + 'px';
    }
  }
};
