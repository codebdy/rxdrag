export enum MenuItemType {
  group = "group",
  route = "link",
  divider = "divider",
  page = "page",
}
export interface IMenuItem<Config = unknown> {
  id: string,
  //string类型用于扩展
  type: MenuItemType | string
  title?: string,
  config?: Config,
  children?: IMenuItem[],
}

export interface IMenu {
  items: IMenuItem[]
}