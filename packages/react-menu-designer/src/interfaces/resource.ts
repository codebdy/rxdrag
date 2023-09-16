import { IMenuItem } from "./menu";
import { ReactComponent } from "@rxdrag/react-shared"

export interface IMenuItemResource<Config = unknown> {
  name: string,
  title?: string,
  configSetter?: ReactComponent,
  render?: () => React.ReactNode,
  createMenuItem: () => IMenuItem<Config>,
}

// export type MenuItemResources = { [name: string]: IMenuItemResource | undefined }