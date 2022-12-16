import { Button } from "antd"
import { useDesignerEngine } from "core-react/hooks"
import { useThemeMode } from "core-react/hooks/useThemeMode"
import { memo, useCallback } from "react"
import { BsMoonStarsFill, BsSunFill } from "react-icons/bs"

export const ThemeButton = memo(() => {
  const themeMode = useThemeMode()
  const engine = useDesignerEngine()
  const handleTriggerThemMode = useCallback(() => {
    engine?.getActions().setThemeMode(themeMode === "dark" ? "light" : "dark")
  }, [engine, themeMode])

  return (
    <Button
      icon={
        themeMode === "dark"
          ? <BsSunFill size={16} style={{ marginTop: 3 }} />
          : <BsMoonStarsFill size={14} style={{ marginTop: 4 }} />
      }
      onClick={handleTriggerThemMode}
    />
  )
})