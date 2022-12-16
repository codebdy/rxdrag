import React, { CSSProperties, memo } from "react"
import cls from "classnames"
import "./style.less"

export type BoxProps = {
  style?: CSSProperties,
  className?: string,
  children?: React.ReactNode
}

export const PaneContainer = memo((
  props: BoxProps,
) => {
  const { className, children, ...other } = props;

  return <div className={cls("rx-toggle-pane-contianer", className)} {...other}>
    {children}
  </div>
})