import { Identifier } from "../dnd"

export enum MenuItemType {
  text = "text",
  route = "route",
  link = "link",
  divider = "divider",
  page = "page"
}

export interface IMenuItemMeta<Config = unknown> {
  id: Identifier,
  //string类型用于扩展
  type: MenuItemType | string
  title?: string,
  config?: Config,
}

export interface IMenuItem<Config = unknown> extends IMenuItemMeta<Config> {
  children?: IMenuItem[],
}

export interface IMenu {
  items: IMenuItem[]
}
