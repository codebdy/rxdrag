import { RXID_ATTR_NAME } from "interfaces";
export function getRecentRxElement(el, atrrName = RXID_ATTR_NAME) {
    if (el.getAttribute(atrrName)) {
        return el;
    } else {
        if (el.parentElement) {
            return getRecentRxElement(el.parentElement, atrrName);
        }
    }
    return undefined;
}

//# sourceMappingURL=getRecentRxElement.js.map