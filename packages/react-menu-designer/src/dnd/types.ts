import { ID } from "@rxdrag/shared"

export type DragEvent = {
  activeId: ID,
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
export type DropIndicator = {
  belowAtId?: string,
  delta?: Offset,
}

export type DragOverEvent = DragEvent & {
  indicator?: DropIndicator,
  droppableOver?: DroppableOverInfo,
}

export type DropEvent = DragEvent & {
  droppableId: ID,
  indicator?: DropIndicator,
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
  overId: ID,
  originalEvent?: MouseEvent,
  draggingOffset?: Offset,
}

export interface IDraggableSnapshot {
  isDragging: boolean;
  draggingOffset?: Offset;
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

export type DroppableOverInfo = OverOffset & {
  id?: ID,
  originalEvent: MouseEvent,
}

export interface IDndSnapshot {
  startMouseEvent?: MouseEvent,
  startRect?: DOMRect,
  //拖动偏移量，从数量落下开始计算
  draggingOffset?: Offset,
  draggingId?: ID,
  overDroppable?: DroppableOverInfo,
}
