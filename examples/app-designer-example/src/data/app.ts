import { INodeSchema } from "@rxdrag/schema";
import { DeviceType, IApp, IAppFrontend } from "../interfaces";
import adminFrame from "./adminFrame.json"
import { defaultMenus } from "./menu";
import { defaultModuleCategories } from "./mudules";

export const defaultApp: IApp = {
  id: "app1",
  title: "火星改造项目"
}

const rootNodeSchema: INodeSchema = {
  componentName: "App"
}

export const appFronts: IAppFrontend[] = [
  {
    app: {
      id: "app1"
    },
    deviceType: DeviceType.admin,
    frameSchema: adminFrame,
    menus: defaultMenus[DeviceType.admin],
    moduleCategories: defaultModuleCategories[DeviceType.admin],
    canvasConfig: {
      deviceName: "管理端",
      //画布宽度
      canvasWidth: 800,
      //画布高度
      canvasHeight: 800,
      //实际屏宽，用于设置iframe的scale
      screenWidth: 1280,
    },
  },
  {
    app: {
      id: "app1"
    },
    deviceType: DeviceType.h5,
    frameSchema: rootNodeSchema,
    menus: defaultMenus[DeviceType.h5],
    moduleCategories: defaultModuleCategories[DeviceType.h5],
    canvasConfig: {
      deviceName: "H5",
      //画布宽度
      canvasWidth: 600,
      //画布高度
      canvasHeight: 600,
      //实际屏宽，用于设置iframe的scale
      screenWidth: 600,
    },
  },
  {
    app: {
      id: "app1"
    },
    deviceType: DeviceType.website,
    frameSchema: rootNodeSchema,
    menus: defaultMenus[DeviceType.website],
    moduleCategories: defaultModuleCategories[DeviceType.website],
    canvasConfig: {
      deviceName: "门户网站",
      //画布宽度
      canvasWidth: 800,
      //画布高度
      canvasHeight: 600,
      //实际屏宽，用于设置iframe的scale
      screenWidth: 1280,
    },
  },
  {
    app: {
      id: "app1"
    },
    deviceType: DeviceType.largeScreen,
    frameSchema: rootNodeSchema,
    menus: defaultMenus[DeviceType.largeScreen],
    moduleCategories: defaultModuleCategories[DeviceType.largeScreen],
    canvasConfig: {
      deviceName: "大屏",
      //画布宽度
      canvasWidth: 800,
      //画布高度
      canvasHeight: 600,
      //实际屏宽，用于设置iframe的scale
      screenWidth: 1680,
    },
  },
]

//canvasConfig