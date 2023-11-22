import { IField, IForm } from "@rxdrag/fieldy";
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
  unsubscribeVariableChange(name: string, listener: VariableListener): void
}

export interface IPropController {
  setProp(name: string, value: unknown): void
  getProp(name: string): unknown,
  getProps(): object | undefined,
  subscribeToPropChange(name: string, listener: PropListener): UnListener
}


export interface IController extends IPropController {
  id: string,
  name?: string,
  fieldyNode?: IForm | IField

  events?: Record<string, EventHandler>,

  initEvent: EventHandler,
  destroyEvent: EventHandler,
  subscribeToPropsChange(listener: PropsListener): UnListener,
  subscribeToEvent(name: string, listener: EventListener): UnListener,
  unsubscribeEvent(name: string, listener: EventListener): void,
  subscribeEventHandlersChange(listener: EventsChangeListener): UnListener

  destroy(): void,
}

export type ControllerReaction = (controller: IController, inputValue?: unknown) => unknown


