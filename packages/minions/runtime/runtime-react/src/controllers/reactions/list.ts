import { ControllerReaction, IController } from "../../interfaces"

export const setDataSource: ControllerReaction = (controller: IController, inputValue?: unknown) => {
  controller.setProp("dataSource", inputValue)
}

export const setPagination: ControllerReaction = (controller: IController, inputValue?: unknown) => {
  controller.setProp("pagination", inputValue)
}