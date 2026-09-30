/**
 * GLOSERIOUSIN - Navigation & View Routing Controller
 */

const Navigation = {
  currentView: 'home',

  init() {
    this.bindScroll();
    this.bindHashRouting();
    this.bindMobileDrawer();
    this.bindNavLinks();
  },

  bindScroll() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    }, { passive: true });
  },

  bindHashRouting() {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (!hash || hash === 'home') {
        this.switchView('home');
      } else if (hash === 'shop' || hash.startsWith('category-')) {
        this.switchView('shop');
        if (hash.startsWith('category-')) {
          const cat = hash.replace('category-', '');
          App.filterCategory(cat);
        }
      } else if (hash.startsWith('product-')) {
        const productId = hash.replace('product-', '');
        this.switchView('pdp', productId);
      } else if (['about', 'journal', 'philosophy', 'bestsellers'].includes(hash)) {
        this.switchView('home');
        setTimeout(() => {
          const target = document.getElementById(hash);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    };

    window.addEventListener('hashchange', handleHash);
    // Initial load
    handleHash();
  },

  switchView(viewName, param = null) {
    this.currentView = viewName;

    const homeSections = document.getElementById('homeView');
    const shopView = document.getElementById('shopView');
    const pdpView = document.getElementById('pdpView');

    // Hide all
    if (homeSections) homeSections.style.display = 'none';
    if (shopView) shopView.classList.remove('is-visible');
    if (pdpView) pdpView.classList.remove('is-visible');

    // Update active nav links
    document.querySelectorAll('.nav-link').forEach(link => {
      const href = link.getAttribute('href');
      if (
        (viewName === 'home' && href === '#home') ||
        (viewName === 'shop' && href === '#shop') ||
        (viewName === 'pdp' && href === '#shop')
      ) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    if (viewName === 'home') {
      if (homeSections) homeSections.style.display = 'block';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (viewName === 'shop') {
      if (shopView) shopView.classList.add('is-visible');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (viewName === 'pdp') {
      if (pdpView) pdpView.classList.add('is-visible');
      if (param) {
        PDP.renderProduct(param);
      }
    }

    this.closeMobileDrawer();
  },

  bindNavLinks() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (!href) return;
        
        if (href === '#home') {
          e.preventDefault();
          window.location.hash = 'home';
          this.switchView('home');
        } else if (href === '#shop') {
          e.preventDefault();
          window.location.hash = 'shop';
          this.switchView('shop');
        }
      });
    });
  },

  bindMobileDrawer() {
    const toggleBtn = document.getElementById('mobileMenuToggle');
    const closeBtn = document.getElementById('mobileDrawerClose');
    const drawer = document.getElementById('mobileDrawer');
    const backdrop = document.getElementById('modalBackdrop');

    if (toggleBtn && drawer && backdrop) {
      toggleBtn.addEventListener('click', () => {
        drawer.classList.add('is-open');
        backdrop.classList.add('is-active');
        document.body.style.overflow = 'hidden';
      });
    }

    if (closeBtn && drawer && backdrop) {
      closeBtn.addEventListener('click', () => this.closeMobileDrawer());
    }
  },

  closeMobileDrawer() {
    const drawer = document.getElementById('mobileDrawer');
    const backdrop = document.getElementById('modalBackdrop');
    if (drawer && backdrop) {
      drawer.classList.remove('is-open');
      if (!document.querySelector('.is-open:not(#mobileDrawer)')) {
        backdrop.classList.remove('is-active');
        document.body.style.overflow = '';
      }
    }
  }
};
