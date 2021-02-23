function match(selector, element) {
    if (!selector || 'string' !== typeof selector || !element) {
        return false;
    }
    const selectorComponentsRev = selector.split(' ').reverse();

    let node = element;
    for (let selectorComponent of selectorComponentsRev) {
        const reg = new RegExp(/(\.\w+)|(^\#\w+)|(\w+)/g)
        let results = reg.exec(selectorComponent);
        while (results) {
            if (results[1]) {
                if (!node.classList.contains(results[0].slice(1))) {
                    return false;
                }
            } else if (results[2]) {
                if (node.id !== results[2].slice(1)) {
                    return false;
                }
            } else if (results[3]) {
                if (node.tagName !== results[3].toUpperCase()) {
                    return false;
                }
            }
            results = reg.exec(selectorComponent);
        }
        node = node.parentNode;
    }
    return true;
}