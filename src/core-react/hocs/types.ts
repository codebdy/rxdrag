
export type Callback = (element?: HTMLElement | null) => HTMLElement | undefined | null;
export const defaultCallback = (element?: HTMLElement | null) => element;
