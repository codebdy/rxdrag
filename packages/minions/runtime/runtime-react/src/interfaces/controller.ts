import { IControllerMeta } from "./meta"

export type Unsubscribe = () => void


export type VariableListener = (value: unknown) => void
export type PropsListener = (name: string, value: unknown) => void
export type UnListener = () => void

export type InputFunc = (inputValue?: unknown) => void
export type EventFuncs = {
  [name: string]: InputFunc | undefined
}

export interface IVariableController {
  setVariable(name: string, value: unknown): void,
  getVariable(name: string): unknown,
  subscribeToVariableChange(name: string, listener: VariableListener): void
}

export interface IPropController {
  setProp(name: string, value: unknown): void
}

export interface IController extends IVariableController, IPropController {
  id: string,
  name?: string,
  meta: IControllerMeta,
  init: (controllers: Controllers) => void,

  events: EventFuncs,
  initEvent?: InputFunc,
  destoryEvent?: InputFunc,
  subscribeToPropsChange(listener: PropsListener): UnListener

  destory(): void,
}

export type Controllers = {
  [id: string]: IController | undefined
}
