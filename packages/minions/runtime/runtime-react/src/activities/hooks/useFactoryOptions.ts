import { IController } from "../../interfaces";

export interface ControllerReactionFactoryOptions {
  controller: IController
}

//获取该库全部配置选项
export function useFactoryOptions(controller: IController) {
  return {
    controller
  }
}