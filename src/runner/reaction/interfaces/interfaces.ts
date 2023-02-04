
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

export type IVariableListener = (value: any) => void

export interface IComponentController {
  id: string,
  name?: string,

  events?: IReaction[],
  reactions?: IReaction[],
  setVariable(name: string, value: any): void,
  listenVariable(name: string, listener: IVariableListener): void
}

export type ReactionFactory = (controller: IComponentController | undefined) => IReaction
