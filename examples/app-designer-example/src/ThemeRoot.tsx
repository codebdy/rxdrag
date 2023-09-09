import { theme, GlobalToken } from "antd"
import { memo, useMemo } from "react"
import { ThemeProvider } from "styled-components"
import { ThemeMode } from "./interfaces"
import { AppThemeModeContext } from "./contexts"

export const ThemeRoot = memo((
  props: {
    children?: React.ReactNode
    mode: ThemeMode
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
    <AppThemeModeContext.Provider value={mode}>
      <ThemeProvider theme={themeValue}>
        {children}
      </ThemeProvider>
    </AppThemeModeContext.Provider>
  )
})