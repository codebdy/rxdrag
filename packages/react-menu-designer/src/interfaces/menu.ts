export enum MenuType {
  group = "group",
  route = "link",
  divider = "divider",
  page = "page",
}
export interface IMenuItem {
  id: string,
  //string类型用于扩展
  type: MenuType | string
  title?: string,
  children?: IMenuItem[],
}

export interface IMenu {
  items: IMenuItem[]
}