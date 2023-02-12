import { createContext } from "react";
import { IField, IFieldyEngine, IForm } from "./interfaces";

export const FieldyContext = createContext<IFieldyEngine | undefined>(undefined)
export const FormContext = createContext<IForm | undefined>(undefined)
export const FieldContext = createContext<IField | undefined>(undefined)