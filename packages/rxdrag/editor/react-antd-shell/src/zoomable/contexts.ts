import { createContext, useContext } from "react";

export type WidgetWidthState = [number, (width: number) => void]

export const defaultToolboxState: WidgetWidthState = [300, () => { throw new Error("not implements") }]
export const defaultPropertyWidthState: WidgetWidthState = [360, () => { throw new Error("not implements") }]

export const PropertyWidthContext = createContext<WidgetWidthState>(defaultPropertyWidthState)
export const ToolboxWidthContext = createContext<WidgetWidthState>(defaultToolboxState)

export function usePropertyWidthState() {
  return useContext(PropertyWidthContext)
}

export function useToolboxWidthState() {
  return useContext(ToolboxWidthContext)
}

export type PreviewState = [boolean, React.Dispatch<React.SetStateAction<boolean>>]
export const defaultPreviewState: PreviewState = [false, () => { throw new Error("not implements") }]
export const PreviewContext = createContext<PreviewState>(defaultPreviewState)

export function usePreviewState() {
  return useContext(PreviewContext)
}

