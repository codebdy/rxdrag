import { useThemeMode } from "core-react/hooks/useThemeMode"
import { memo } from "react"

export const ShadowCanvasView = memo((
  props: {
    backgroundColor?: string,
    onRefChange?:(host: HTMLElement | null)=>void
  }
) => {
  const { backgroundColor, onRefChange } = props
  const themeMode = useThemeMode()
  return (
    <div ref={onRefChange}
      className="shadow-dom-canvas"
      style={{
        backgroundColor: backgroundColor,
        outline: `${themeMode === "dark" ? "#444" : "#ddd"} solid 1px`,
      }}
    >
    </div>
  )
})