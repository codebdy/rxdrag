import React, { CSSProperties, memo } from "react"
import { useStyles } from "../../hooks/useStyles";
import cls from "classnames"
import "./style.less"

export const CanvasToolbar = memo((
  props: {
    className?: string,
    style?: CSSProperties,
    children?: React.ReactNode
  }
) => {
  const { className, style, children, ...other } = props;
  const styles = useStyles((token) => ({
    borderBottom: `${token.colorBorder} solid 1px`,
  }))

  return (
    <div className={cls("rx-canvas-toolbar", className)} style={{ ...styles, ...style }} {...other}>
      {children}
    </div>
  )
})