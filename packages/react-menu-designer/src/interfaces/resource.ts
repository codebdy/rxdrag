import { IMenuItem } from "./menu";
import { ReactComponent } from "@rxdrag/react-shared"

export interface IMenuItemResource<Config = unknown> {
  name: string,
  title?: string,
  configSetter?: ReactComponent,
  render?: (item?: IMenuItem<Config>) => React.ReactNode,
  createMenuItem: () => IMenuItem<Config>,
  //无子元素
  childless?: boolean,
}

// export type MenuItemResources = { [name: string]: IMenuItemResource | undefined }