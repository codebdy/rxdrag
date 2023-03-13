export type Unsubscribe = () => void

export type InputHandler = (inputValue?: any) => void

export interface IJointer {
  id: string,
  name: string,
  push: InputHandler,
  connect: (jointer: IJointer | InputHandler) => void
  disconnect: (jointer: IJointer | InputHandler) => void
}


export interface IReaction {
  id: string
  inputs: IJointer[]
  outputs: IJointer[]
  meta?: IReactionMeta
  destory(): void
}

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

export type ReactionControllers = {
  [id: string]: IController | undefined
}
