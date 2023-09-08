import { Button } from "antd"
import { memo, useCallback } from "react"
import { BsMoonStarsFill, BsSunFill } from "react-icons/bs"
import { ThemeMode } from "../interfaces"

export const ThemeButton = memo((
  props: {
    flat?: boolean,
    themeMode?: ThemeMode,
    onThemeModeChange?: (themeMode: ThemeMode) => void
  }
) => {
  const { flat, themeMode, onThemeModeChange } = props
  const handleTriggerThemMode = useCallback(() => {
    onThemeModeChange?.(themeMode === "dark" ? "light" : "dark")
  }, [onThemeModeChange, themeMode])

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