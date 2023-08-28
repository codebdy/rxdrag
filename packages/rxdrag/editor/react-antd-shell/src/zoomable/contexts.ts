import { createContext, useContext } from "react";

export type ProertyWidthState = [number, (width: number) => void]

export const defaultPropertyState: ProertyWidthState = [300, () => { throw new Error("not implements") }]

export const PropertyWidthContext = createContext<ProertyWidthState>(defaultPropertyState)

export function usePropertyWidthState() {
  return useContext(PropertyWidthContext)
}