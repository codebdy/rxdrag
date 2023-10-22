import { createContext } from "react";
import { IModule } from "../interfaces/module";
import { EntityMeta } from "./ModuleUiDesigner/interfaces/EntityMeta";

export const ModuleContext = createContext<IModule | undefined>(undefined)
export const EntitiesContext = createContext<EntityMeta[] | undefined>(undefined)
