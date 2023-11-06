import { memo, useEffect, useMemo } from "react"
import { Navbar } from "../Navbar"
import { Toolbar } from "../Toolbar"
import { Toolbox } from "../Toolbox"
import { PropertyPanel } from "../PropertyPanel"
import { GlobalToken, theme } from "antd"
import styled, { ThemeProvider } from "styled-components"
import classNames from "classnames"
import { ContainerImpl, DragDropDriver, CanvasResizeDriver, MouseMoveDriver, KeyboardDriver } from "@rxdrag/core"
import { useDesignerEngine } from "@rxdrag/react-core"
import { OutlinePanel } from "../OutlinePanel"
import { commonLocales } from "../../../locales"

const Container = styled.div`
  position: fixed;
  z-index: 1000;
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

  const engine = useDesignerEngine()
  useEffect(() => {
    if (engine) {
      const container = new ContainerImpl(engine, document.body, "$$container$$", [
        DragDropDriver,
        CanvasResizeDriver,
        MouseMoveDriver,
        KeyboardDriver
      ])
      engine.getShell()?.setContainer(container)

      return () => {
        engine.getShell().getContainer()?.destroy()
      }
    }
  }, [engine])

  useEffect(() => {
    const langMgr = engine?.getLocalesManager()
    langMgr?.registerLocales(commonLocales)
  }, [engine])

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
        <OutlinePanel />
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