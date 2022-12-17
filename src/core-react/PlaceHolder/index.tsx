import { useNode } from "core-react/hooks/useNode"
import { memo } from "react"
import "./style.less"
import cls from "classnames"
import { useThemeMode } from "core-react/hooks/useThemeMode"

export const PlaceHolder = memo(() => {
  const themeMode = useThemeMode()
  const node = useNode()
  return (
    <div className={cls("rx-placeholder", themeMode)}>
      {node?.title}
    </div>
  )
})