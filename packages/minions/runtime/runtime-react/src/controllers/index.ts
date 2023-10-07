import { IControllerMeta } from "../interfaces"
import { ButtonController } from "./ButtonController"
import { DefaultController, DefaultControllerName } from "./DefaultController"
import { ListController } from "./ListController"
import { PopupController } from "./PopupController"

export * from "./DefaultController"
export * from "./ButtonController"
export * from "./ListController"
export * from "./PopupController"
export * from "./VariableController"

export const predefinedControllerFactories = {
  [DefaultControllerName]: (meta: IControllerMeta) => new DefaultController(meta),
  ButtonController: (meta: IControllerMeta) => new ButtonController(meta),
  ListController: (meta: IControllerMeta) => new ListController(meta),
  PopupController: (meta: IControllerMeta) => new PopupController(meta),
}
