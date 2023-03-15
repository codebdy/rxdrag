import { IField, IFieldyEngine, IForm } from "@rxdrag/fieldy";
import { createContext } from "react";

export const FieldyContext = createContext<IFieldyEngine | undefined>(undefined)
export const FormContext = createContext<IForm | undefined>(undefined)
export const FieldContext = createContext<IField | undefined>(undefined)