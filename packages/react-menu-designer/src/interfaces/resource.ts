import { Identifier } from "../dnd";
import { IConfig, IMenuItemMeta } from "./menu";

export type ConfigSetterProps<Config extends IConfig = IConfig> = {
  value?: Config,
  onChange?: (value: Config) => void
}

export interface IMenuItemResource<Config extends IConfig = IConfig> {
  id: Identifier,
  title?: string,
  configSetter?: React.FC<ConfigSetterProps<Config>>,
  render?: (item?: IMenuItemMeta<Config>) => React.ReactNode,
  createMenuItem: () => IMenuItemMeta<Config>,
  //无子元素
  childless?: boolean,
  selector?: (item?: IMenuItemMeta<Config>) => boolean
}

// export type MenuItemResources = { [name: string]: IMenuItemResource | undefined }