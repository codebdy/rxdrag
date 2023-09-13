import { IMenuItem, MenuItemType } from "./menu";
import { ReactComponent } from "@rxdrag/react-shared"

export interface IMenuItemMaterial<Config = unknown> {
  type: MenuItemType | string,
  //是否是分组
  group?: boolean,
  title?: string,
  configSetter?: ReactComponent,
  render?: () => React.ReactNode,
  resource?: IMenuItem,
  createMenuItem?: () => IMenuItem<Config>
}

export type MenuItemMaterials = { [name: string]: IMenuItemMaterial | undefined }