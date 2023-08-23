import { ILocales } from "@rxdrag/locales";
import { ControllerFactory, IControllerMeta } from "@rxdrag/minions-runtime-react";

export interface ISetterProps {
  value: IControllerMeta,
  onChange?: (value?: IControllerMeta) => void
}

export interface IControllerDefine {
  name: string,
  label?: string,
  factory: ControllerFactory,
  setter: React.FC<ISetterProps> | React.ComponentClass<ISetterProps>,
  locales?: ILocales,
}