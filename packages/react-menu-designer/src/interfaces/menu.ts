import { UniqueIdentifier } from "@dnd-kit/core"

export enum MenuItemType {
  text = "text",
  route = "route",
  link = "link",
  divider = "divider",
  page = "page"
}
export interface IMenuItem<Config = unknown> {
  id: UniqueIdentifier,
  //string类型用于扩展
  type: MenuItemType | string
  title?: string,
  config?: Config,
  children?: IMenuItem[],
}

export interface IMenu {
  items: IMenuItem[]
}