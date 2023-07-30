
//antd组件的ref，有时候不是HTMLElement
export type Callback = (element?: HTMLElement | unknown) => HTMLElement | unknown ;
export const defaultCallback = (element?: HTMLElement | unknown) => element;
