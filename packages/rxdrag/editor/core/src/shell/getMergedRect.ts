import { IRect } from "../interfaces";

export function getMergedRect(rects: { x: number; y: number; height: number; width: number; }[]) {
  if (!rects.length) {
    return null
  }
  if (rects.length === 1) {
    return rects[0]
  }
  const rtRect: IRect = rects[0];

  for (const rect of rects) {
    if (rect.x < rtRect.x) {
      rtRect.x = rect.x;
    }

    if (rect.y < rtRect.y) {
      rtRect.y = rect.y;
    }

    if ((rect.x + rect.width) > (rtRect.x + rect.width)) {
      rtRect.width = rect.x + rect.width - rtRect.x;
    }
    if ((rect.y + rect.height) > (rtRect.y + rect.height)) {
      rtRect.height = rect.y + rect.height - rtRect.y;
    }
  }
  return rtRect;
}
