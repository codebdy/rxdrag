import React, { CSSProperties, memo } from "react"
import { Box } from "../../components/Box"
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
    <Box className={cls("rx-canvas-toolbar", className)} style={{ ...styles, ...style }} {...other}>
      {children}
    </Box>
  )
})