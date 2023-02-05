import { IReactionMaterial } from "./material"
import { IConfigMeta, IReactionMeta } from "./metas"

export type Unsubscribe = () => void

export type InputHandler = (inputValue?: any) => void

export interface IJointer {
  id: string,
  name?: string,
  push: InputHandler,
  connect: (jointer: IJointer | InputHandler) => void
  disconnect: (jointer: IJointer | InputHandler) => void
}


export interface IReaction {
  id: string
  inputs: IJointer[]
  outputs: IJointer[]
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
}

export interface IPropController {
  setProp(name: string, value: any): void
}

export interface IComponentController {
  id: string,
  name?: string,

  events: EventFuncs,
  initEvent?: InputFunc,
  destoryEvent?: InputFunc,
  createReaction(meta: IReactionMeta): IReaction,
  subcribeToVariableChange(name: string, listener: VariableListener): UnListener
  subscribeToPropsChange(listener: PropsListener): UnListener
}

export type ComponentControllers = {
  [id: string]: IComponentController | undefined
}

export interface IReactionFactoryOptions {
  //属于某个控件的reaction需要传的参数
  variableController?: IVariableController,
  propsController?: IPropController,
  materials?: IReactionMaterial[] 
}

export type ReactionFactory = (meta: IReactionMeta<IConfigMeta>, options?: IReactionFactoryOptions) => IReaction
