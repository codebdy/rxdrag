import { useToken } from "antd/es/theme/internal"
import React, { memo, useMemo } from "react"
import styled, { ThemeProvider } from "styled-components"
import { useThemeMode } from "@rxdrag/react-core"
import { IThemeToken } from "@rxdrag/minions-logicflow-editor"
import classNames from "classnames"

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-flow: column;
  background-color: ${props => props.theme.token?.colorBgBase};
`

export const EditorContainer = memo((
  props: {
    children?: React.ReactNode
  }
) => {
  const [, token] = useToken()
  const themeMode = useThemeMode()
  const theme: { token: IThemeToken } = useMemo(() => {
    return {
      token
    }
  }, [token])

  return (
    <ThemeProvider theme={theme}>
      <Container className={classNames(themeMode, "normal-editor")}>
        {props.children}
      </Container>
    </ThemeProvider>
  )
})