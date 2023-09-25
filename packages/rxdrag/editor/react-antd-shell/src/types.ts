import { ILocales } from "@rxdrag/locales";
import { ControllerFactory, IOldControllerMeta } from "@rxdrag/minions-runtime-react";

export interface ISetterProps {
  value: IOldControllerMeta,
  onChange?: (value?: IOldControllerMeta) => void
}

export interface IControllerDefine {
  name: string,
  label?: string,
  factory: ControllerFactory,
  setter: React.FC<ISetterProps> | React.ComponentClass<ISetterProps>,
  locales?: ILocales,
}