import {MOCK_MAIN, MOCK_PRODUCT, MOCK_SEARCH} from "./mock-tags"
export const config = {
  matches: ["https://*.coupang.com/*"]
}

export function onLoad(callback) {
  var tid = setInterval(function () {
    if (document.readyState === 'loading' || document.readyState === 'interactive' || document.readyState === 'complete') {
      clearInterval(tid);
      return callback();
    }

  }, 100);
}

export const SITE = {
  COUPANG: 'coupang',
  TEMU: 'temu',
}

export const PAGE = {
  MAIN: 'main',
  SEARCH: 'search',
  PRODUCT: 'product',
}

export class DomChanger {
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
      if (page === PAGE.MAIN) {
        this.updateElements = MOCK_MAIN
      } else if (page === PAGE.SEARCH) {
        this.updateElements = MOCK_SEARCH
      } else if (page === PAGE.PRODUCT) {
        this.updateElements = MOCK_PRODUCT
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
