import { RXID_ATTR_NAME } from "../../interfaces"

export function getRecentRxElement(el: HTMLElement, attrName: string = RXID_ATTR_NAME): HTMLElement | undefined {
  if (el?.getAttribute(attrName)) {
    return el
  } else {
    if (el?.parentElement) {
      return getRecentRxElement(el?.parentElement, attrName)
    }
  }
  return undefined
} 