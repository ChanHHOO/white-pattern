import $ from "jquery"

export function appendStyle(querySelector, style = "", innerText = "") {
    const element = $(querySelector)

    if (style) {
        element.attr("style", element.attr('style') + ";" + style)
    }

    if (innerText) {
        element.text(innerText)
    }
}

export function observeElementCreation(targetSelector, callback) {
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach((node) => {
                    // Check if the node is an Element and matches the selector
                    if (node instanceof Element && node.matches(targetSelector)) {
                        callback(node);
                        observer.disconnect();
                    } else if (node instanceof Element) {
                        // If it's an Element but doesn't match, check its children
                        const matchingChild = node.querySelector(targetSelector);
                        if (matchingChild) {
                            callback(matchingChild);
                            observer.disconnect();
                        }
                    }
                });
            }
        });
    });

    const config = { childList: true, subtree: true };

    observer.observe(document.body, config);

    return observer;
}
