import { ID } from "@rxdrag/shared";

export enum MenuItemType {
  text = "text",
  group = "group",
  route = "route",
  link = "link",
  divider = "divider",
  page = "page"
}

export interface IConfig {
  title?: string
}

export interface IMenuItemMeta<Config extends IConfig = IConfig> {
  id: ID,
  //string类型用于扩展
  type: MenuItemType | string
  config?: Config,
}

export interface IMenuItem<Config extends IConfig = IConfig> extends IMenuItemMeta<Config> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children?: IMenuItem<any>[],
}

export interface IMenu {
  items: IMenuItem[]
}
