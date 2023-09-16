export type Identifier = string | number;

export type ItemInfo = {
  id: Identifier,
  data?: unknown,
}

export type DragEvent = {
  active: ItemInfo,
  originalEvent: MouseEvent,
}

export type OverOffset = {
  offsetX?: number,
  offsetY?: number,
  offsetXPercent?: number,
  offsetYPercent?: number,
}

export type DragStartEvent = DragEvent

export type DragMoveEvent = DragEvent & {
  over: ItemInfo,
}

export type DragOverEvent = DragEvent & {
  over: ItemInfo,
  offset?: OverOffset,
}

export type DragEndEvent = DragEvent & {
  over: ItemInfo,
  offset?: OverOffset,
}

export type DragCancelEvent = DragEvent