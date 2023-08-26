import { memo, useMemo } from "react"
import { Navbar } from "../Navbar"
import { Toolbar } from "../Toolbar"
import { Toolbox } from "../Toolbox"
import { PropertyPanel } from "../PropertyPanel"
import { GlobalToken, theme } from "antd"
import styled, { ThemeProvider } from "styled-components"
import classNames from "classNames"

const Container = styled.div`
  z-index: 100000;
`

export type ToolkitsInnerProps = {
  themeMode?: "dark" | "light",
  toolbox?: React.ReactNode,
  toolbar?: React.ReactNode | false,
}

export const ToolkitsInner = memo((props: ToolkitsInnerProps) => {
  const { toolbox, toolbar, themeMode } = props;
  const { token } = theme.useToken()
  const themeValue: { token: GlobalToken } = useMemo(() => {
    return {
      token
    }
  }, [token])

  return (
    <ThemeProvider theme={themeValue}>
      <Container className={classNames(themeMode, "inline-editor")}>
        {
          toolbox !== false &&
          <Toolbox>
            {toolbox}
          </Toolbox>
        }

        <PropertyPanel />
        {
          toolbar !== false &&
          <Toolbar>
            {toolbar}
          </Toolbar>
        }
        <Navbar />
      </Container>
    </ThemeProvider>
  )
})