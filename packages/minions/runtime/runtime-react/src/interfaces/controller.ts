import { IVariable } from "@rxdrag/minions-schema";

export const CONTROLLER_EVENT_INIT = "onInit";
export const CONTROLLER_EVENT_DESTORY = "onDestory"

export type Unsubscribe = () => void

export type VariableListener = (value: unknown) => void
export type PropListener = (value: unknown) => void
export type PropsListener = (name: string, value: unknown) => void
export type EventListener = (args?: unknown[]) => void
export type EventsChangeListener = (eventHandlers?: Record<string, EventHandler>) => void
export type UnListener = () => void

export type EventHandler = (args?: unknown[]) => void

export interface IVariableController {
  setMetas(variableMetas?: IVariable[]): void,
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

  events?: Record<string, EventHandler>,

  initEvent: EventHandler,
  destroyEvent: EventHandler,
  subscribeToPropsChange(listener: PropsListener): UnListener,
  subscribeToEvent(name: string, listener: EventListener): UnListener,
  subscribeEventHandlersChange(listener: EventsChangeListener): UnListener

  destroy(): void,
}

export type ControllerReaction = (controller: IController, inputValue?: unknown) => void


