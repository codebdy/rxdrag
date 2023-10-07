import { IVariableController } from "./controller"

export interface IVariableContext {
  variableController?: IVariableController
}

export interface IReactContext {
  navigate?: (url: string) => void,
  urlParams?: unknown,
}