
//antd组件的ref，有时候不是HTMLElement
export type Callback = (element?: HTMLElement | null) => HTMLElement | null | undefined;
export const defaultCallback = (element?: HTMLElement | null): HTMLElement | null | undefined => element ;
