import { ControllerReaction, IController } from "../../interfaces"

export const disable: ControllerReaction = (controller: IController) => {
  controller.setProp("disabled", true)
}

export const enable: ControllerReaction = (controller: IController) => {
  controller.setProp("disabled", false)
}