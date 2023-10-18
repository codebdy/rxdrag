export const EVENT_ELEMENT_SELECTED_CHANGE = "elementSelectedChange";
export const EVENT_PREPARE_LINK_TO = "prepareLinkTo";
export const EVENT_PRESSED_LINE_TYPE = "pressedLineType";
export const EVENT_CLASS_CHANGED = "classChanged";
export const EVENT_UNDO_REDO = "undoRedo";

export interface ICanvasEvent {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  detail?: any;
}

export function onCanvasEvent(name: string, listener: EventListener) {
  document.addEventListener(name, listener);
}

export function offCanvasEvent(name: string, listener: EventListener) {
  document.removeEventListener(name, listener);
}

export function triggerCanvasEvent(canvasEvent: ICanvasEvent) {
  const event = new CustomEvent(canvasEvent.name, { detail: canvasEvent.detail });
  document.dispatchEvent(event);
}
