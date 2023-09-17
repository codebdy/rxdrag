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

//export type DragStartEvent = DragEvent

// export type DragMoveEvent = DragEvent & {
//   //
// }

// export type DragOverEvent = DragEvent & {
//   //
// }

export type DropEvent = DragEvent & {
  droppableId: Identifier,
  targetIndex: number,
  offset?: OverOffset,
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

export type DroppableGhostFn = (
  innerRef: (element?: HTMLElement | null) => void,
  draggingId?: string,
) => React.ReactNode;

export interface DroppableProvided {
  innerRef: (element: HTMLElement | null) => void;
  placeholder?: React.ReactElement<HTMLElement> | null | undefined;
}

export interface IDroppableStateSnapshot {
  isDraggingOver: boolean;
  over?: OverDroppableInfo;
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
}

export type OverDroppableInfo = OverInfo & {
  //targetIndex?: number,
}

export interface IDndSnapshot {
  startMouseEvent?: MouseEvent
  draggingOffset?: Offset
  draggingId?: Identifier
  overDraggable?: OverInfo,
  overDroppable?: OverDroppableInfo,
}


export type ChildItem = {
  id: Identifier,
  index: number,
}