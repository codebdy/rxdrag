import React, { CSSProperties, memo } from "react"
import { Box } from "../../components/Box"
import cls from "classnames"
import "./style.less"
import { useStyles } from "react-shells/ant5/hooks/useStyles"

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
    <Box className={cls(className, "rx-center-content")} style={{ ...styles, ...style }} {...other}>
      {children}
    </Box>
  )
})