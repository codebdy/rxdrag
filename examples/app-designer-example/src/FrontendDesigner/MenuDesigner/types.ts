import { IConfig } from "@rxdrag/react-menu-designer";

export const moduleResouceType = "module"

export interface IModuleItemConfig extends IConfig {
  moduleId: string
}

export type ITextConfig = IConfig

export interface ILinkConfig extends IConfig {
  url?: string,
}