import { IIcon } from "@rxdrag/react-antd-icons";
import { IConfig } from "@rxdrag/react-menu-designer";

export const moduleResouceType = "module"

export interface IIconableConfig extends IConfig {
  icon?: IIcon,
}

export interface IModuleItemConfig extends IIconableConfig {
  moduleId: string,

}

export type IGroupConfig = IIconableConfig

export interface ILinkConfig extends IIconableConfig {
  url?: string,
}