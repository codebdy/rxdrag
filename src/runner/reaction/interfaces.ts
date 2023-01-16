import { IEventMeta } from "./metas"

export type Unsubscribe = () => void

export interface IHandlerArgs {
  inputValue?: any,
  outputs?: InputHandlers,
  context?: any
}

export type InputHandler = (args?: IHandlerArgs) => void

export type InputHandlers = {
  [name: string]: InputHandler
}

export interface IJointer {
  flowIn: InputHandler,
  addHandler: (handler: InputHandler) => void
  removeHandler: (handler: InputHandler) => void
}

export type OutputJointers = {
  [name: string]: IJointer | undefined
}

export interface ILogic {
  state: any,
  inputs: InputHandlers
  outputs?: InputHandlers
  getJointer?: (name: string) => IJointer | undefined
}

export interface IComponentController extends ILogic {
  effects: InputHandlers,
  events: InputHandlers,
}
