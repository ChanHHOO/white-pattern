function onLoad(callback) {
  var tid = setInterval(function () {
    if (document.readyState === 'interactive' || document.readyState === 'complete') {
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
    var baseEelement = document.body;
    for (const selectorElements of path) {
      var sevivorElements = [];
      for (const selector of selectorElements) {
        const elements = baseEelement.querySelectorAll(selector);
        if (elements.length > 0) {
          sevivorElements.push(...elements);
        }
      }
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
      console.log(selector, 'before: ', element.style[Object.keys(styleObject)[0]])
      Object.assign(element.style, styleObject);
      console.log(selector, 'after: ', element.style[Object.keys(styleObject)[0]])
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