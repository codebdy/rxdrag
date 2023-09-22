import { theme, GlobalToken } from "antd"
import { memo, useMemo } from "react"
import { ThemeProvider } from "styled-components"

export type ThemeMode = "dark" | "light"

export const ThemeRoot = memo((
  props: {
    children?: React.ReactNode
    mode?: ThemeMode
  }
) => {
  const { mode, children } = props
  const { token } = theme.useToken()

  const themeValue: { token: GlobalToken, mode?: ThemeMode } = useMemo(() => {
    return {
      token,
      mode: mode,
    }
  }, [mode, token])

  return (
    <ThemeProvider theme={themeValue}>
      {children}
    </ThemeProvider>
  )
})