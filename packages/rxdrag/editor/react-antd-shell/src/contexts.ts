import { ILocales } from "@rxdrag/locales";
import { ActivityMaterialCategory } from "@rxdrag/minions-schema";
import { IComponents } from "@rxdrag/react-shared";
import { ReactNode, createContext } from "react";

export interface IMinionOptions {
  minionMaterials?: ActivityMaterialCategory<ReactNode>[],
  minionLocales?: ILocales,
  minionPropSetters?: IComponents,
}

export const MinionOptionContext = createContext<IMinionOptions | undefined>(undefined)