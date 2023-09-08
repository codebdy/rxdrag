import { ConfigProvider, theme } from "antd"
import { memo, useEffect, useMemo, useState } from "react"
import { Toolbar } from "./Toolbar"
import { UiDesigner } from "./UiDesigner"
import { AppContext } from "./contexts"
import { useQueryApp } from "./hooks/useQueryApp"
import { ThemeRoot } from "./ThemeRoot"
import { DeviceType } from "./interfaces"
import styled from "styled-components"
import { LocalesContext } from "@rxdrag/react-locales"
import { LocalesManager } from "@rxdrag/locales"
import { appDesignerLocales } from "./locales"

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-flow: column;
  box-sizing: border-box;
  background-color: ${props => props.theme.token?.colorBgContainer};
  color: ${props => props.theme.token?.colorText};
`

export const AppDesignerExample = memo((props: {
  canvasUrl: string,
  previewUrl: string,
}) => {
  const { canvasUrl, previewUrl } = props
  const [themeMode, setThemeMode] = useState<"dark" | "light">("dark")
  const { app } = useQueryApp("app1")
  const [device, setDevice] = useState<DeviceType>(DeviceType.admin)

  const localesManger = useMemo(() => new LocalesManager(), [])

  useEffect(() => {
    localesManger.registerLocales(appDesignerLocales)
  }, [localesManger])

  return (
    <ConfigProvider
      theme={{
        algorithm: themeMode === "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm
      }}
    >
      <LocalesContext.Provider value={localesManger}>
        <ThemeRoot mode={themeMode}>
          <AppContext.Provider value={app}>
            <Container className="zoomable-editor">
              <Toolbar
                device={device}
                onDeviceChange={setDevice}
                themeMode={themeMode}
                onThemeModeChange={setThemeMode}
              />
              <UiDesigner
                device={device}
                canvasUrl={canvasUrl}
                previewUrl={previewUrl}
                themeMode={themeMode}
              />
            </Container>
          </AppContext.Provider>
        </ThemeRoot>
      </LocalesContext.Provider>
    </ConfigProvider>
  )
})