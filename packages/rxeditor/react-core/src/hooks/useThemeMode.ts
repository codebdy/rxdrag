import { ThemeMode } from "@rxdrag/core";
import { useEffect, useState } from "react";
import { useDesignerEngine } from "./useDesignerEngine";

export const useThemeMode = () => {
  const [themeMode, setThemeMode] = useState<ThemeMode>("light")
  const engine = useDesignerEngine()

  useEffect(() => {
    setThemeMode(engine?.getMonitor().getState().themeMode || "light")
  }, [engine])

  useEffect(() => {
    const monitor = engine?.getMonitor()
    if (monitor) {
      const unsub = monitor.subscribeToThemeModeChange((mode) => {
        setThemeMode(mode || "light")
      })

      return unsub
    }
  }, [engine])
  return themeMode;
}
