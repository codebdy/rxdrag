export function addZIndex(zIndex, diff) {
    const zNum = Number(zIndex);
    if (!Number.isNaN(zNum)) {
        return parseInt(zIndex || "0") + diff + "";
    } else {
        return diff + "";
    }
}

//# sourceMappingURL=add-zindex.js.map