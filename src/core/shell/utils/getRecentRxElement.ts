import { RXID_ATTR_NAME } from "core/interfaces";

export function getRecentRxElement(el:HTMLElement, atrrName:string = RXID_ATTR_NAME): HTMLElement|undefined{
  if(el.getAttribute(atrrName)){
    return el
  }else{
    if(el.parentElement){
      return getRecentRxElement(el.parentElement, atrrName)
    }
  }
  return undefined
} 