import { Identifier } from "../dnd"

export enum MenuItemType {
  text = "text",
  route = "route",
  link = "link",
  divider = "divider",
  page = "page"
}

export interface IConfig {
  title?: string
}

export interface IMenuItemMeta<Config extends IConfig = IConfig> {
  id: Identifier,
  //string类型用于扩展
  type: MenuItemType | string
  config?: Config,
}

export interface IMenuItem<Config extends IConfig = IConfig> extends IMenuItemMeta<Config> {
  children?: IMenuItem[],
}

export interface IMenu {
  items: IMenuItem[]
}
