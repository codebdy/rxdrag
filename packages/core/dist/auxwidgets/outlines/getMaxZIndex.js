export function getMaxZIndex(el, max = 0) {
    const zIndexStr = window.getComputedStyle(el).zIndex;
    let zIndex = max;
    if (zIndexStr !== "auto") {
        zIndex = Number(zIndexStr);
    }
    const maxZIndex = Math.max(zIndex, max);
    if (el.parentElement) {
        return getMaxZIndex(el.parentElement, maxZIndex);
    } else {
        return maxZIndex;
    }
}

//# sourceMappingURL=getMaxZIndex.js.map