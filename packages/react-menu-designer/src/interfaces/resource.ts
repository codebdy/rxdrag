import { IMenuItem } from "./menu";
import { ReactComponent } from "@rxdrag/react-shared"

export interface IMenuItemResource<Config = unknown> {
  configSetter?: ReactComponent,
  render?: () => React.ReactNode,
  createMenuItem: () => IMenuItem<Config>,
  //是否跟菜单项同源
  isSameSoure: (menuItem: IMenuItem) => boolean,
}

// export type MenuItemResources = { [name: string]: IMenuItemResource | undefined }