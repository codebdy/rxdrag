import { GlobalToken, theme } from "antd"
import { memo, useMemo } from "react"
import { ThemeProvider } from "styled-components";

export const EditorScope = memo((
  props: {
    children?: React.ReactNode,
  }
) => {
  const { children } = props;
  const { token } = theme.useToken()
  const themeValue: { token: GlobalToken } = useMemo(() => {
    return {
      token: token,
    }
  }, [token])

  return (
    <ThemeProvider theme={themeValue}>
      {children}
    </ThemeProvider>
  )
})