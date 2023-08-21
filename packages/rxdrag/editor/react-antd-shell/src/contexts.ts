import { ILocales } from "@rxdrag/locales";
import { ActivityMaterialCategory } from "@rxdrag/minions-schema";
import { IReactComponents } from "@rxdrag/react-shared";
import { ReactNode, createContext } from "react";
import { IControllerDefine } from "./types";

export interface IMinionOptions {
  materials?: ActivityMaterialCategory<ReactNode>[],
  locales?: ILocales,
  propSetters?: IReactComponents,
  controllers?: IControllerDefine[]
}

export const MinionOptionContext = createContext<IMinionOptions | undefined>(undefined)