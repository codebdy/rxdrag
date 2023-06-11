import { IControllerMeta, ILogicFlowControllerMeta } from "./meta"

export type Unsubscribe = () => void


export type VariableListener = (value: unknown) => void
export type PropListener = (value: unknown) => void
export type PropsListener = (name: string, value: unknown) => void
export type UnListener = () => void

export type EventFunc = (...args: unknown[]) => void
export type EventFuncs = {
  [name: string]: EventFunc | undefined
}

export interface IVariableController {
  setVariable(name: string, value: unknown): void,
  getVariable(name: string): unknown,
  subscribeToVariableChange(name: string, listener: VariableListener): UnListener
}

export interface IPropController {
  setProp(name: string, value: unknown): void
  getProp(name: string): unknown,
  subscribeToPropChange(name: string, listener: PropListener): UnListener
}

export interface IController extends IVariableController, IPropController {
  id: string,
  name?: string,
  meta: ILogicFlowControllerMeta,
  init: (controllers: Controllers, context: unknown) => void,

  events: EventFuncs,
  initEvent?: EventFunc,
  destoryEvent?: EventFunc,
  subscribeToPropsChange(listener: PropsListener): UnListener

  destory(): void,
}

export type Controllers = {
  [controllerId: string]: IController | undefined
}

export type ControllerFactory = (meta: IControllerMeta) => IController