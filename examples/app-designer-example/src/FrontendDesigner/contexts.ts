import { createContext } from "react";
import { IModule } from "../interfaces/module";

export const ModuleContext = createContext<IModule | undefined>(undefined)