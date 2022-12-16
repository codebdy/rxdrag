import { createContext } from "react";
import { IFieldyEngine } from "./interfaces";

export const FieldyContext = createContext<IFieldyEngine | undefined>(undefined)

export const FormNameContext = createContext<string|undefined>(undefined)

export const FieldPathContext = createContext<string|undefined>(undefined)