import { ControllerReaction, IController } from "../../interfaces"

export const open: ControllerReaction = (controller: IController) => {
  controller.setProp("open", true)
}

export const close: ControllerReaction = (controller: IController) => {
  console.log("====>close")
  controller.setProp("open", false)
}