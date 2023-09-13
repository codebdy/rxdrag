import { IMenuItem, MenuType } from "./menu";
import { ReactComponent } from "@rxdrag/react-shared"

export interface IMenuMaterial {
  type: MenuType | string,
  configSetter: ReactComponent,
  render: () => React.ReactNode,
  resource: IMenuItem,
}