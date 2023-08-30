import { IComponentMaterial, IMinionOptions } from "@rxdrag/react-core";
import { ISetterComponents } from "@rxdrag/core";
import { ReactComponent } from "@rxdrag/react-shared";
import { ILocales } from "@rxdrag/locales";


export type EditorScropProps = {
  themeMode?: 'light' | 'dark';
  //逻辑编排配置项
  minionOptions?: IMinionOptions;
  materials?: IComponentMaterial[];
  setters?: ISetterComponents<ReactComponent>;
  locales?: ILocales;
  children?: React.ReactNode;
};
