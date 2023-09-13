export enum MenuItemType {
  text = "text",
  route = "route",
  link = "link",
  divider = "divider",
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