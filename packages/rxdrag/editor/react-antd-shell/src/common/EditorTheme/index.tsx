import { useToken } from "antd/es/theme/internal"
import React, { memo, useMemo } from "react"
import { ThemeProvider } from "styled-components"
import { useThemeMode } from "@rxdrag/react-core"
import { IThemeToken } from "@rxdrag/minions-logicflow-editor"

export const EditorTheme = memo((
  props: {
    children?: React.ReactNode
  }
) => {
  const [, token] = useToken()
  const themeMode = useThemeMode()
  const theme: { token: IThemeToken } = useMemo(() => {
    return {
      token,
      mode: themeMode,
    }
  }, [themeMode, token])

  return (
    <ThemeProvider theme={theme}>
      {props.children}
    </ThemeProvider>
  )
})