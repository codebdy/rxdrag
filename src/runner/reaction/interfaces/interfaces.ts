import { IConfigMeta, IReactionMeta } from "./metas"

export type Unsubscribe = () => void

export interface IHandlerArgs {
  inputValue?: any,
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

export type OutputJointer = {
  [name: string]: IJointer
}
export type OutputJointers = {
  [name: string]: IJointer | undefined
}

export interface IReaction {
  id: string
  inputs: InputHandlers
  outputs: OutputJointers
}

export type VariableListener = (value: any) => void
export type PropsListener = (name: string, value: any) => void
export type UnListener = ()=>void

export interface IComponentController {
  id: string,
  name?: string,

  events?: IReaction[],
  reactions?: IReaction[],
  setVariable(name: string, value: any): void,
  subcribeToVariableChange(name: string, listener: VariableListener): UnListener
  subscribeToPropsChange(listener: PropsListener): UnListener
}

export type ComponentControllers = {
  [id: string]: IComponentController | undefined
}

export type ReactionFactory = (controllers: ComponentControllers, meta: IReactionMeta<IConfigMeta>) => IReaction
