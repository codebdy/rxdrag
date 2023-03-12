export function cloneObject(obj) {
    if (!obj) {
        return obj;
    }
    return JSON.parse(JSON.stringify(obj));
}

//# sourceMappingURL=clone-object.js.map