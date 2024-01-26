import { IComponentMaterial } from "@rxdrag/core";
//import { IControllerMaterial } from "@rxdrag/minions-logicflow-editor";
import { ReactComponent } from "@rxdrag/react-shared";
import { ReactNode } from "react";


export type IMaterial<ControllerMaterial = unknown> = IComponentMaterial<ReactComponent, ReactNode, ControllerMaterial>

export interface ICanvasConfig {
  //设备端名称
  deviceName?: string,
  //画布宽度
  canvasWidth?: number,
  //画布高度
  canvasHeight?: number,
  //实际屏宽，用于设置iframe的scale
  screenWidth?: number,
}

