import { IMenuItem } from "@rxdrag/react-menu-designer";

export interface IMenu {
  id: string,
  title?: string,
  items?: IMenuItem[]
}