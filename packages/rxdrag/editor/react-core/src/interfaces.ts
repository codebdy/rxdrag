import { IComponentConfig } from "@rxdrag/core";
import { ReactComponent } from "@rxdrag/react-shared";
import { ReactNode } from "react";

//export type ReactComponent = React.FC<any> | React.ComponentClass<any>

export type IComponentMaterial = IComponentConfig<ReactComponent, ReactNode>

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

