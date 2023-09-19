export type Identifier = string;


export type DragEvent = {
  activeId: Identifier,
  originalEvent: MouseEvent,
}

export type OverOffset = {
  offsetX?: number,
  offsetY?: number,
}

//export type DragStartEvent = DragEvent

// export type DragMoveEvent = DragEvent & {
//   //
// }

// export type DragOverEvent = DragEvent & {
//   //
// }

export type DropEvent = DragEvent & {
  droppableId: Identifier,
  belowAtId?: string,
  //在容器内部拖拽的距离
  delta?: Offset,
}

// export type DragCancelEvent = DragEvent

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
  //offset: OverOffset,
  originalEvent?: MouseEvent,
  draggingOffset?: Offset,
}

export interface IDraggableSnapshot {
  isDragging: boolean;
  draggingOffset?: Offset;
  //isDropAnimating: boolean;
  //dropAnimation?: DropAnimation | undefined;
  draggingOver?: DraggingOver;
}

export type DraggleProvider = {
  innerRef: (element?: HTMLElement | null) => void,
  handlerRef?: (element?: HTMLElement | null) => void,
}

export type DraggableChildrenFn = (
  provider: DraggleProvider,
  snapshot: IDraggableSnapshot,
) => React.ReactNode;

export type DroppableGhostFn = (
  innerRef: (element?: HTMLElement | null) => void,
  snapshot?: {
    draggingId?: Identifier,
    delta?: Offset,
    belowAtId?: Identifier
  }
) => React.ReactNode;

export interface DroppableProvided {
  innerRef: (element: HTMLElement | null) => void;
  placeholder?: React.ReactElement<HTMLElement> | null | undefined;
}

export interface IDroppableStateSnapshot {
  isDraggingOver: boolean;
  belowAtId?: string,
  cannotDrop?: boolean,
  originalEvent?: MouseEvent,
  delta?: Offset,
}

export type DroppableChildrenFn = (
  innerRef: (element?: HTMLElement | null) => void,
  snapshot?: IDroppableStateSnapshot,
) => React.ReactNode;

export type Offset = {
  x: number,
  y: number,
}

export type OverInfo = OverOffset & {
  id?: Identifier,
  originalEvent: MouseEvent,
}

export interface IDndSnapshot {
  startMouseEvent?: MouseEvent,
  startRect?: DOMRect,
  draggingOffset?: Offset,
  draggingId?: Identifier,
  overDraggable?: OverInfo,
  overDroppable?: OverInfo,
}


export type ChildItem = {
  id: Identifier,
  index: number,
}

export type DropIndicator = {
  belowAtId?: string,
  cannotDrop?: boolean,
  delta?: Offset,
}
