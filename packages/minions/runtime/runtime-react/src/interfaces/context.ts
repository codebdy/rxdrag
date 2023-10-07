import { ControllerReaction, IController, IVariableController } from "./controller"

export interface IVariableContext {
  variableController?: IVariableController
}

export interface IReactContext {
  controllers?: Record<string, IController>
  navigate?: (url: string) => void,
  urlParams?: unknown,
  reactions?: Record<string, ControllerReaction>
}