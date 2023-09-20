import { IConfig, IMenuItem } from "./menu";

export type ConfigSetterProps<Config extends IConfig = IConfig> = {
  value?: Config,
  onChange?: (value?: Config) => void
}

export interface IMenuItemResource<Config extends IConfig = IConfig> {
  name: string,
  title?: string,
  configSetter?: React.FC<ConfigSetterProps<Config>>,
  render?: (item?: IMenuItem<Config>) => React.ReactNode,
  createMenuItem: () => IMenuItem<Config>,
  //无子元素
  childless?: boolean,
}

// export type MenuItemResources = { [name: string]: IMenuItemResource | undefined }