import { IControllerMeta } from "./meta"

export const CONTROLLER_EVENT_INIT = "onInit";
export const CONTROLLER_EVENT_DESTORY = "onDestory"

export type Unsubscribe = () => void

export type VariableListener = (value: unknown) => void
export type PropListener = (value: unknown) => void
export type PropsListener = (name: string, value: unknown) => void
export type EventListener = (args?: unknown[]) => void
export type UnListener = () => void

export type EventHandler = (args?: unknown[]) => void
export type EventHandlers = {
  [name: string]: EventHandler | undefined
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


export interface IController extends IPropController {
  id: string,
  name?: string,

  events: EventHandlers,
  initEvent: EventHandler,
  destroyEvent: EventHandler,
  subscribeToPropsChange(listener: PropsListener): UnListener,
  subscribeToEvent(name: string, listener: EventListener): UnListener,

  destroy(): void,
}

export type ControllerFactory = (meta: IControllerMeta) => IController

