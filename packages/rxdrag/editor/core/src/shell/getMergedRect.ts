import { IRect } from "../interfaces";

export function getMergedRect(rects: { x: number; y: number; height: number; width: number; }[]) {
  const rtRect: IRect = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  };

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
