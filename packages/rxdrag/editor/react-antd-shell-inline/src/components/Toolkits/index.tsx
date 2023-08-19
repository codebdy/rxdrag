import { memo, useMemo } from "react"
import styled, { ThemeProvider } from "styled-components"
import { NavPostion, Navbar } from "../Navbar"
import { Toolbar } from "../Toolbar"
import { Toolbox } from "../Toolbox"
import { PropertyPanel } from "../PropertyPanel"
import { GlobalToken, theme } from "antd"

const Container = styled.div`
  z-index: 100000;
`

export const Toolkits = memo(() => {
  const { token } = theme.useToken()
  const themeValue: { token: GlobalToken } = useMemo(() => {
    return {
      token
    }
  }, [token])
  return (
    <ThemeProvider theme={themeValue}>
      <Container>
        <Toolbox />
        <PropertyPanel />
        <Toolbar />
        <Navbar position={NavPostion.BottomRight} />
      </Container>
    </ThemeProvider>
  )
})