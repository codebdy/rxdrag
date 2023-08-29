import React, { memo, useMemo } from "react"
import { ThemeProvider } from "styled-components"
import { useThemeMode } from "@rxdrag/react-core"
import { GlobalToken, theme } from "antd"

export const EditorTheme = memo((
  props: {
    children?: React.ReactNode
  }
) => {
  const { token } = theme.useToken()
  const themeMode = useThemeMode()
  const themeValue: { token: GlobalToken, mode?: "dark" | "light" } = useMemo(() => {
    return {
      token,
      mode: themeMode,
    }
  }, [themeMode, token])

  return (
    <ThemeProvider theme={themeValue}>
      {props.children}
    </ThemeProvider>
  )
})