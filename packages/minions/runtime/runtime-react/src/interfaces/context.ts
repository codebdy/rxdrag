import { Controllers, IVariableController } from "./controller"

export interface IControllerContext {
  controllers: Controllers,
}

export interface IVariableContext {
  variableController: IVariableController
}