import { useDesignerEngine, useThemeMode } from "@rxdrag/react-core"
import { Button } from "antd"
import { memo, useCallback } from "react"
import { BsMoonStarsFill, BsSunFill } from "react-icons/bs"

export const ThemeButton = memo((
  props: {
    flat?: boolean
  }
) => {
  const { flat } = props
  const themeMode = useThemeMode()
  const engine = useDesignerEngine()
  const handleTriggerThemMode = useCallback(() => {
    engine?.getActions().setThemeMode(themeMode === "dark" ? "light" : "dark")
  }, [engine, themeMode])

  return (
    <Button
      type={flat ? "text" : undefined}
      icon={
        themeMode === "dark"
          ? <BsSunFill size={16} style={{ marginTop: 3 }} />
          : <BsMoonStarsFill size={14} style={{ marginTop: 4 }} />
      }
      onClick={handleTriggerThemMode}
    />
  )
})