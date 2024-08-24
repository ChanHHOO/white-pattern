function onLoad(callback) {
  var tid = setInterval(function () {
    if (document.readyState === 'loading' || document.readyState === 'interactive' || document.readyState === 'complete') {
      clearInterval(tid);
      return callback();  
    }
    
  }, 100);
}

class DomChanger {
  constructor() {
    this.preserveStructurePath = [];
    this.updateElementStyles = [];
    this.removeElements = [];
  }

  run() {
    console.log('DomChanger.run()');
    if (this.preserveStructurePath.length > 0) {
      this.preserveSpecificStructure(this.preserveStructurePath);
    }
    if (this.updateElementStyles.length > 0) {
      for (const [selector, style] of this.updateElementStyles) {
        this.updateElementStyle(selector, style);
      }
    }
    if (this.removeElements.length > 0) {
      for (const selector of this.removeElements) {
        this.removeElement(selector);
      }
    }
  }

  /**
   * Removes an element by its selector along with its children.
   * @param {string} selector - The selector of the element to remove.
   */
  removeElement(selector) {
    const elements = document.querySelectorAll(selector);
    for (const element of elements) {
      element.remove();
    }
  }

  /**
   * Keeps only the specified structure starting from the root ID.
   * @param {string} rootId - The ID of the root element to start with.
   * @param {string[]} structure - The hierarchy of IDs to preserve.
   */
  preserveSpecificStructure(path) {
    let baseEelement = document.body;
    for (const selectorElement of path) {
      const sevivorElements = [];
      
      if (typeof selectorElement === 'string') {
        sevivorElements.push(...baseEelement.querySelectorAll(selectorElement));
      }
      if (selectorElement instanceof Array) {
        for (const selector of selectorElement) {
          sevivorElements.push(...baseEelement.querySelectorAll(selector));
        }
      }

      console.log('sevivorElements: ', sevivorElements)
      while (baseEelement.firstChild) {
        baseEelement.removeChild(baseEelement.firstChild);
      }
      for (const sevivorElement of sevivorElements) {
        baseEelement.appendChild(sevivorElement);
      }
      if (sevivorElements.length > 0) {
        baseEelement = sevivorElements[0];
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