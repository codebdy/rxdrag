import { useCallback, useContext } from "react";
import { WidgetsContext } from "../contexts";

export function useToggleDisplay() {
  const { updateWidget, widgets } = useContext(WidgetsContext) || {}
  const toggle = useCallback((name: string) => {
    const widget = widgets?.[name]
    updateWidget?.(name, { ...widget || {}, closed: !widget?.closed })
  }, [updateWidget, widgets])

  return toggle
}