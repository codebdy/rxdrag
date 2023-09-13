import { useCallback, useContext } from "react";
import { WidgetsContext } from "../contexts";

export function useSetClosed(name: string | undefined, display?: boolean) {
  const { updateWidget, widgets } = useContext(WidgetsContext) || {}
  const setWidgetLayout = useCallback(() => {
    if (!name) {
      return
    }
    const widget = widgets?.[name]
    updateWidget?.(name, { ...widget||{}, closed: display })
  }, [display, name, updateWidget, widgets])

  return setWidgetLayout
}