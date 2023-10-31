import { useCallback, useContext } from "react";
import { WidgetsContext } from "../contexts";
import { IWidgetLayout } from "../interfaces";

export function useSetWidgetLayout(name?: string) {
  const { updateWidget } = useContext(WidgetsContext) || {}
  const setWidgetLayout = useCallback((layout?: IWidgetLayout) => {
    if (name) {
      updateWidget?.(name, layout)
    }
  }, [name, updateWidget])

  return setWidgetLayout
}