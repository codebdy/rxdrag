import { ControllerReaction, IController } from "../../interfaces"

export const validate: ControllerReaction = (controller: IController,  inputValue?: unknown) => {
  controller?.fieldyNode?.validate()
  return inputValue
}

export const readValue: ControllerReaction = (controller: IController) => {
  return controller.fieldyNode?.getValue()
}

export const setValue: ControllerReaction = (controller: IController, inputValue?: unknown) => {
  controller.setProp("value", inputValue)
  return inputValue
}