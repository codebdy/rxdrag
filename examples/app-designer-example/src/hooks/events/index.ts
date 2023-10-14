
export const EVENT_DATA_CHANGED = "rxdrag:changed";

export type Handler = (event: CustomEvent) => void;

function on(eventType: string, listener: EventListener) {
  document.addEventListener(eventType, listener);
}

function off(eventType: string, listener: EventListener) {
  document.removeEventListener(eventType, listener);
}

function trigger(eventType: string, data: string) {
  console.log('trigger事件', eventType, data);
  const event = new CustomEvent(eventType, { detail: data });
  document.dispatchEvent(event);
}

export { on, off, trigger };
