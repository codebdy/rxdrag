import { ID } from "@rxdrag/shared";
import { IConfig, IMenuItemMeta, MenuItemType } from "./menu";

export type ConfigSetterProps<Config extends IConfig = IConfig> = {
  value?: Config,
  onChange?: (value: Config) => void
}

export type SelectorOption<Config extends IConfig = IConfig> = {
  type: MenuItemType | string
  config?: Config,
}

export interface IMenuItemResource<Config extends IConfig = IConfig> {
  id: ID,
  title?: string,
  configSetter?: React.FC<ConfigSetterProps<Config>>,
  render?: (item?: IMenuItemMeta<Config>) => React.ReactNode,
  createMenuItem: () => IMenuItemMeta<Config>,
  //无子元素
  childless?: boolean,
  selector?: (options?: SelectorOption<Config>) => boolean
}

// export type MenuItemResources = { [name: string]: IMenuItemResource | undefined }