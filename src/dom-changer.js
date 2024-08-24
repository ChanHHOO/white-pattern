function onLoad(callback) {
  var tid = setInterval(function () {
    if (document.readyState === 'loading' || document.readyState === 'interactive' || document.readyState === 'complete') {
      clearInterval(tid);
      return callback();  
    }
    
  }, 100);
}

const SITE = {
  COUPANG: 'coupang',
  TEMU: 'temu',
}

const PAGE = {
  MAIN: 'main',
  SEARCH: 'search',
  PRODUCT: 'product',
}

class DomChanger {
  constructor(site) {
    if (site !== SITE.COUPANG && site !== SITE.TEMU) {
      throw new Error('Invalid site');
    }
    this.site = site;
    this.updateElements = [];
  }

  getChangeTags(page) {
    // using API to get the tags info from the LLM-server finding the bad-patterns
    console.log('DomChanger.getChangeTags()');
    if (this.site === SITE.COUPANG) {
      const commonPages = [
        ["#todaysHot", { display: "none !important;" }],
        [".top-bar", { display: "none !important;" }],
        ["div.gnb-menu-container", { display: "none !important;" }],
        ["div.category-btn", { display: "none !important;" }],
        ["#coupang-banner", { display: "none !important;" }],
        ["#footer", { display: "none !important;" }],  
      ]
      const commonContensts = [
        ["#sdp-mid-banner-btf", { display: "none !important;" }],
          ["#promotionCarousel", { display: "none !important;" }],
          ["#welcomebackNudage", { display: "none !important;" }],
          ["#searchCarouselWidget", { display: "none !important;" }],
          ["#searchAlsoViewedProducts", { display: "none !important;" }],
          ["div.recommendation", { display: "none !important;" }],
          ["div#sdpAdsBottom", { display: "none !important;" }],
          ["div#promotionCarousel", { display: "none !important;" }],
          ["div#midCarousel", { display: "none !important;" }],
          ["div#midCarousel1", { display: "none !important;" }],
          ["div#midCarousel2", { display: "none !important;" }],
          ["div#midCarousel3", { display: "none !important;" }],
          ["div#midCarousel4", { display: "none !important;" }],
          ["div#prod-detail-recommend", { display: "none !important;" }],
          ["div.sdp-also-viewed-products-widget", { display: "none !important;" }],
          ["div#peopleAlsoBought", { display: "none !important;" }],
          ["div#sdpBottomAds", { display: "none !important;" }],
          ["div#sdp-bottom-banner", { display: "none !important;" }],
          [".srp-top-banner-container", { display: "none !important;" }],
          ["#srp-bottom-carousel-dco-contaner", { display: "none !important;" }],
          ["#srpKeywordProductTopBanner", { display: "none !important;" }],
          [".sdw-aging", { display: "none !important;" }],
      ]
      if (page === PAGE.MAIN) {
        this.updateElements = [
          ...commonPages,

          ["#header", { height: "1007px" }],
          ["#contents", { display: "none !important;" }],
        ]
      } else if (page === PAGE.SEARCH) {
        this.updateElements = [
          ...commonPages,
          ...commonContensts,
        ]
      } else if (page === PAGE.PRODUCT) {
        this.updateElements = [
          ...commonPages,
          ...commonContensts
        ]
      }
    } else if (this.site === SITE.TEMU) {
      
    }
  }

  run(page) {
    console.log('DomChanger.run()');
    this.getChangeTags(page);
    
    const HOUR = 60 * 60 * 1000;
    setInterval(() => {
      this.getChangeTags(page);
    }, HOUR);

    if (this.updateElements.length > 0) {
      for (const [selector, style] of this.updateElements) {
        this.updateElementStyle(selector, style);
      }
    }
  }

  /**
   * Updates the style of an element by its ID.
   * @param {string} selector
   * @param {object} style - An object containing CSS properties and values.
   */
  updateElementStyle(selector, styleObject) {
    // update the style of the element
    const element = document.querySelector(selector);
    if (element) {
      Object.assign(element.style, styleObject);
    }

    // update the style tag
    let styleTag = document.querySelector('style');
    if (!styleTag) {
        styleTag = document.createElement('style');
        document.head.appendChild(styleTag);
    }
    const styleString = Object.entries(styleObject)
        .map(([key, value]) => `${key}: ${value};`)
        .join(' ');
    styleTag.appendChild(document.createTextNode(`${selector} { ${styleString} }`));
  }
}