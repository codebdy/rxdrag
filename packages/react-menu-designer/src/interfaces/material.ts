import { IMenuItem, MenuItemType } from "./menu";
import { ReactComponent } from "@rxdrag/react-shared"

export interface IMenuItemMaterial<Config = unknown> {
  type: MenuItemType | string,
  title?: string,
  configSetter?: ReactComponent,
  render?: () => React.ReactNode,
  resource?: IMenuItem,
  createMenuItem?: () => IMenuItem<Config>
}

export type MenuItemMaterials = { [name: string]: IMenuItemMaterial | undefined }