function onLoad(callback) {
  var tid = setInterval(function () {
    if (document.readyState !== 'complete') return;
    clearInterval(tid);
    return callback();
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
    const element = document.querySelector(selector);
    if (element) {
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
      baseEelement = sevivorElements[0];
    }
  }

  /**
   * Updates the style of an element by its ID.
   * @param {string} selector
   * @param {object} style - An object containing CSS properties and values.
   */
  updateElementStyle(selector, style) {
    const element = document.querySelector(selector);
    console.log('updateElementStyle', element, style);
    if (element) {
      Object.assign(element.style, style);
    }
  }
}