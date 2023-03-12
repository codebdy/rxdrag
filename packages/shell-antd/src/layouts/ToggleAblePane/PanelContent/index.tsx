import { memo } from "react"
import "./style.less"
import cls from "classnames"
import { CSSProperties } from "styled-components"

export const PanelContent = memo((
  props: {
    style?: CSSProperties,
    className?: string,
    children?: React.ReactNode
  }
) => {
  const { style, className, children } = props
  return (
    <div style={style} className={cls("rx-toggle-pane-conent", className)}>
      {children}
    </div>
  )
})