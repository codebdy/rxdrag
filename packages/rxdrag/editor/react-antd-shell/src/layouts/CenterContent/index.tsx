import React, { CSSProperties, memo } from "react"
import cls from "classnames"
import "./style.less"
import { useStyles } from "../../hooks"

export const CenterContent = memo((
  props: {
    className?: string,
    style?: CSSProperties,
    children?: React.ReactNode
  }
) => {
  const { className, children, style, ...other } = props;
  const styles = useStyles((token) => ({
    background: token.colorBorderSecondary
  }))

  return (
    <div className={cls(className, "rx-center-content")} style={{ ...styles, ...style }} {...other}>
      {children}
    </div>
  )
})