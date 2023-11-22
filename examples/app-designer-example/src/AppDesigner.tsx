import { Toolbar } from "./Toolbar"
import { Outlet } from "react-router-dom"
import { ConfigProvider, theme } from "antd"
import { memo, useEffect, useMemo, useState } from "react"
import { ThemeRoot } from "./ThemeRoot"
import styled from "styled-components"
import { LocalesContext } from "@rxdrag/react-locales"
import { appDesignerLocales } from "./locales"
import { LocalesManager } from "@rxdrag/locales"
import classNames from "classnames"

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-flow: column;
  box-sizing: border-box;
  background-color: ${props => props.theme.token?.colorBgContainer};
  color: ${props => props.theme.token?.colorText};
`
export const AppDesigner = memo(() => {
  const localesManger = useMemo(() => new LocalesManager(), [])

  useEffect(() => {
    localesManger.registerLocales(appDesignerLocales)
  }, [localesManger])

  const [themeMode, setThemeMode] = useState<"dark" | "light">("dark")
  return (
    <ConfigProvider
      theme={{
        algorithm: themeMode === "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm
      }}
    >
      <LocalesContext.Provider value={localesManger}>
        <ThemeRoot mode={themeMode}>
          <Container className={classNames("zoomable-editor", themeMode)}>
            <Toolbar
              themeMode={themeMode}
              onThemeModeChange={setThemeMode}
            />
            <Outlet />
          </Container>
        </ThemeRoot>
      </LocalesContext.Provider>
    </ConfigProvider>
  )
})