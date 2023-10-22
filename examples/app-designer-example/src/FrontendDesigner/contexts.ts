import { createContext } from "react";
import { IModule } from "../interfaces/module";
import { EntityMeta } from "./ModuleUiDesigner/interfaces/EntityMeta";
import { MetaContent } from "@rxdrag/uml-editor";

export const ModuleContext = createContext<IModule | undefined>(undefined)
export const MetaContext = createContext<MetaContent | undefined>(undefined)
export const EntitiesContext = createContext<EntityMeta[] | undefined>(undefined)
