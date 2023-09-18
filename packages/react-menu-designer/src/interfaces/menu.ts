import { Identifier } from "../dnd"

export enum MenuItemType {
  text = "text",
  route = "route",
  link = "link",
  divider = "divider",
  page = "page"
}
export interface IMenuItem<Config = unknown> {
  id: Identifier,
  //string类型用于扩展
  type: MenuItemType | string
  title?: string,
  config?: Config,
  children?: IMenuItem[],
}

export interface IMenu {
  items: IMenuItem[]
}

//设计器用的Schema
export interface IMenuItemSchema<Config = unknown> extends IMenuItem<Config> {
  collapsed?: boolean,
}