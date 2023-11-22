import { ControllerReaction, IController } from "../../interfaces"

export const validate: ControllerReaction = (controller: IController, inputValue?: unknown) => {
  controller?.fieldyNode?.validate()
  return inputValue
}

export const getValue: ControllerReaction = (controller: IController) => {
  return controller.fieldyNode?.getValue()
}

export const setValue: ControllerReaction = (controller: IController, inputValue?: any) => {
  //重复点开编辑对话框，会不刷新，所以重新赋值一遍inputValue
  console.log("===>form value", inputValue)
  controller.setProp("value", { ...inputValue })
  return inputValue
}

export const reset: ControllerReaction = (controller: IController) => {
  return controller.fieldyNode?.reset()
}