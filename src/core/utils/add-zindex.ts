import { isNum } from "./types";

export function addZIndex(zIndex: string, diff: number): string {
  if (isNum(zIndex)) {
    return (parseInt(zIndex || "0") + diff) + ""
  } else {
    return diff + ""
  }

}