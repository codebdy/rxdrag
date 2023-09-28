import { IVariableController, IPropController, PropsListener, UnListener } from "./controller";

export interface IComponentController extends IVariableController, IPropController {
  
  subscribeToPropsChange(listener: PropsListener): UnListener
  destroy(): void,
}