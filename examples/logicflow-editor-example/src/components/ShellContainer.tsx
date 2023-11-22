import { IThemeToken } from "@rxdrag/minions-logicflow-editor"
import { useToken } from "antd/es/theme/internal"
import { memo, useMemo } from "react"
import styled, { ThemeProvider } from "styled-components"

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
  background-color: ${props => props.theme.token?.colorBgBase};
  box-sizing: border-box;
`

export const ShellContainer = memo((
  props: {
    children?: React.ReactNode
  }
) => {
  const [, token] = useToken()
  const theme: { token: IThemeToken } = useMemo(() => {
    return {
      token
    }
  }, [token])

  return (
    <ThemeProvider theme={theme}>
      <Container>
        {props.children}
      </Container>
    </ThemeProvider>
  )
})