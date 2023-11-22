import { ControllerReaction, IController } from "../../interfaces"

export const setDataSource: ControllerReaction = (controller: IController, inputValue?: unknown) => {
  controller.setProp("dataSource", inputValue)
}

export const setPagination: ControllerReaction = (controller: IController, inputValue?: unknown) => {
  controller.setProp("pagination", inputValue)
}

export const setFilters: ControllerReaction = (controller: IController, inputValue?: unknown) => {
  controller.setProp("fliters", inputValue)
}

export const setSorter: ControllerReaction = (controller: IController, inputValue?: unknown) => {
  controller.setProp("sorter", inputValue)
}