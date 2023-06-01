import { ILocales } from "@rxdrag/locales";
import { ActivityMaterialCategory } from "@rxdrag/minions-schema";
import { ReactNode, createContext } from "react";

export interface IMinionOptions {
  minionMaterials?: ActivityMaterialCategory<ReactNode>[],
  minionLocales?: ILocales,
}

export const MinionOptionContext = createContext<IMinionOptions | undefined>(undefined)