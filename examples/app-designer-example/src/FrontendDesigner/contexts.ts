import { createContext } from "react";
import { IModule } from "../interfaces/module";
import { MetaContent } from "@rxdrag/uml-editor";

export const ModuleContext = createContext<IModule | undefined>(undefined)
export const MetaContext = createContext<MetaContent | undefined>(undefined)
