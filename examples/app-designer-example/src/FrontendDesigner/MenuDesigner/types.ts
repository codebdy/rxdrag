import { IConfig } from "@rxdrag/react-menu-designer";

export const moduleResouceType = "module"

export interface IModuleItemConfig extends IConfig {
  moduleId: string
}

export interface ITextConfig {
  title?: string,
}

export interface ILinkConfig {
  title?: string,
  url?: string,
}