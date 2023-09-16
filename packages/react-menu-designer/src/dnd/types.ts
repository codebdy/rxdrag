export type Identifier = string;


export type DragEvent = {
  activeId: Identifier,
  originalEvent: MouseEvent,
}

export type OverOffset = {
  offsetX?: number,
  offsetY?: number,
  offsetXPercent?: number,
  offsetYPercent?: number,
}

export type DragStartEvent = DragEvent

// export type DragMoveEvent = DragEvent & {
//   //
// }

// export type DragOverEvent = DragEvent & {
//   //
// }

export type DropEvent = DragEvent & {
  droppableId: Identifier,
  index: number,
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


export interface DroppableProvided {
  innerRef: (element: HTMLElement | null) => void;
  placeholder?: React.ReactElement<HTMLElement> | null | undefined;
}

export interface IDroppableStateSnapshot {
  isDraggingOver: boolean;
  draggingOverWith?: Identifier | undefined;
}

export type DroppableChildrenFn = (
  innerRef: (element?: HTMLElement | null) => void,
  snapshot: IDroppableStateSnapshot,
) => React.ReactNode;

export type Offset = {
  x: number,
  y: number,
}

export type OverInfo = {
  overId?: Identifier,
  offset?: OverOffset,
}

export interface IDndSnapshot {
  startMouseEvent?: MouseEvent
  draggingOffset?: Offset
  draggingId?: Identifier
  overDraggable?: OverInfo,
  overDroppable?: OverInfo,
}
