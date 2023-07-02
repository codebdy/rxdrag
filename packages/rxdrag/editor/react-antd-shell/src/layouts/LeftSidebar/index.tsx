import { GlobalToken } from "antd/es/theme/interface";
import React, { CSSProperties, memo } from "react"
import { useStyles } from "../../hooks/useStyles";
import "./style.less"

const sidebarStyles = (token: GlobalToken): CSSProperties => {
  return {
    borderRight: `solid 1px ${token.colorBorder}`,
  }
}

export const LeftSidebar = memo((
  props: {
    style?: CSSProperties,
    children?: React.ReactNode
  }
) => {
  const { style, children, ...other } = props;
  const styles = useStyles(sidebarStyles)
  return (
    <div className="rx-left-sidebar" style={{ ...styles, ...style }} {...other}>
      {children}
    </div>
  )
})