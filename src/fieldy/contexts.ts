import { createContext } from "react";
import { IFieldMeta, IFieldyEngine } from "./interfaces";

export const FieldyContext = createContext<IFieldyEngine | undefined>(undefined)

export const FormNameContext = createContext<string | undefined>(undefined)

//export const FieldPathContext = createContext<string | undefined>(undefined)

export type ValueSetter<T> = (value?: T | ((previousValue?: T) => T)) => void

export interface IFieldParams {
  path?: string,
  fieldMeta?: IFieldMeta,
  value?: any,
  setValue?: ValueSetter<any>,
  setInitalValue?: ValueSetter<any>,
  validate?: () => void,
}

const initailParams: IFieldParams = {
}

export const FieldContext = createContext<IFieldParams>(initailParams)