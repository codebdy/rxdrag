import { ICanvasConfig, IMaterial, LayoutType } from "@rxdrag/react-core";
import { ISetterComponents } from "@rxdrag/core";
import { ReactComponent } from "@rxdrag/react-shared";
import { ILocales } from "@rxdrag/locales";


export type EditorScropProps = {
  themeMode?: 'light' | 'dark';
  //逻辑编排配置项
  //minionOptions?: IMinionOptions;
  materials?: IMaterial[];
  setters?: ISetterComponents<ReactComponent>;
  locales?: ILocales;
  canvasUrl?: string;
  previewUrl?: string;
  layoutType?: LayoutType;
  children?: React.ReactNode;
  canvasConfig?: ICanvasConfig;
};
