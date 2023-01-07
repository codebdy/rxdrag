
export function addZIndex(zIndex: string, diff: number): string {
  const zNum = Number(zIndex)
  if (!Number.isNaN(zNum)) {
    return (parseInt(zIndex || "0") + diff) + ""
  } else {
    return diff + ""
  }

}