import { ILocales } from "@rxdrag/locales";
import { ActivityMaterialCategory } from "@rxdrag/minions-schema";
import { IComponents } from "@rxdrag/react-shared";
import { ReactNode, createContext } from "react";
import { IControllerDefine } from "./types";

export interface IMinionOptions {
  materials?: ActivityMaterialCategory<ReactNode>[],
  locales?: ILocales,
  propSetters?: IComponents,
  controllers?: IControllerDefine[]
}

export const MinionOptionContext = createContext<IMinionOptions | undefined>(undefined)