
export function getRecentRxElement(el: HTMLElement, attrName: string): HTMLElement | undefined {
  if (el?.getAttribute(attrName)) {
    return el
  } else {
    if (el?.parentElement) {
      return getRecentRxElement(el?.parentElement, attrName)
    }
  }
  return undefined
} 