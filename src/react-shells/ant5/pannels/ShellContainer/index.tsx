import { useToken } from "antd/es/theme/internal"
import { useThemeMode } from "core-react/hooks/useThemeMode"
import React, { memo } from "react"
import { Box } from "../../components/Box"
import "./style.less"
import cls from "classnames"

export const ShellContainer = memo((
  props: {
    themeMode?: "dark" | "light",
    children?: React.ReactNode
  }
) => {
  const [, token] = useToken()
  const themeMode = useThemeMode()
  return (
    <Box className={cls("rx-shell-container", themeMode)}
      style={{
        backgroundColor: token.colorBgBase,
      }}
    >
      {props.children}
    </Box>
  )
})