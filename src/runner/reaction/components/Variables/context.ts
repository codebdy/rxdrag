import { createContext } from "react";

export interface IVariables {
  [name: string]: any | undefined
}

export const VariablesContext = createContext<IVariables | undefined>(undefined)