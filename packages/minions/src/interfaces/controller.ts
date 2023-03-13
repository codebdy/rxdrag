import { IControllerMeta } from "@rxdrag/schema"

export type Unsubscribe = () => void


export type VariableListener = (value: any) => void
export type PropsListener = (name: string, value: any) => void
export type UnListener = () => void

export type InputFunc = (inputValue?: any) => void
export type EventFuncs = {
  [name: string]: InputFunc | undefined
}

export interface IVariableController {
  setVariable(name: string, value: any): void,
  getVariable(name: string): any,
  subscribeToVariableChange(name: string, listener: VariableListener): void
}

export interface IPropController {
  setProp(name: string, value: any): void
}

export interface IController extends IVariableController, IPropController {
  id: string,
  name?: string,
  meta: IControllerMeta,

  events: EventFuncs,
  initEvent?: InputFunc,
  destoryEvent?: InputFunc,
  subscribeToPropsChange(listener: PropsListener): UnListener

  destory(): void,
}

export type Controllers = {
  [id: string]: IController | undefined
}
