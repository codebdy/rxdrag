export type Identifier = string | number;

export type OverInfo = {
  item: Identifier,
  container?: unknown,
}

export type DragEvent = {
  active: OverInfo,
  originalEvent: MouseEvent,
}

export type OverOffset = {
  offsetX?: number,
  offsetY?: number,
  offsetXPercent?: number,
  offsetYPercent?: number,
}

export type DragStartEvent = DragEvent

export type DropEvent = DragEvent & {
  over: OverInfo,
  offset?: OverOffset,
}

export type DragCancelEvent = DragEvent

export interface Position {
  x: number;
  y: number;
}


// export interface DropAnimation {
//   duration: number;
//   curve: string;
//   moveTo: Position;
//   opacity?: number | undefined;
//   scale?: number | undefined;
// }

export type DraggingOver = {
  overId: Identifier,
  offset: OverOffset,
  originalEvent?: MouseEvent,
}

export interface IDraggableStateSnapshot {
  isDragging: boolean;
  //isDropAnimating: boolean;
  //dropAnimation?: DropAnimation | undefined;
  draggingOver?: DraggingOver;
}

export type DraggableChildrenFn = (
  innerRef: (element?: HTMLElement | null) => void,
  snapshot: IDraggableStateSnapshot,
) => React.ReactNode;