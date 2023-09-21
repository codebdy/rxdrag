import { forwardRef, memo } from "react"
import { ConfigProvider, GlobalToken, theme } from "antd"
import { AppInner, AppInnerProps } from "./AppInner"
import { ThemeMode, ThemeRoot } from "./ThemeRoot"
import { AppFrontendContext } from "../../../../contexts"
import { useQueryFrontend } from "../../../../hooks/useQueryFrontend"
import { DeviceType } from "../../../../interfaces"
import { useQueryApp } from "../../../../hooks/useQueryApp"

export type AppProps = {
  themeMode?: ThemeMode,
  //主题自定义信息token，做一个编辑setter
  token?: GlobalToken,
} & AppInnerProps

export const App = memo(forwardRef<HTMLDivElement, AppProps>((props, ref) => {
  const { themeMode = "light", children, token, ...rest } = props
  const { app } = useQueryApp()
  const { frontend } = useQueryFrontend(app?.id, DeviceType.admin)
  return (
    <AppFrontendContext.Provider value={frontend}>
      <ConfigProvider
        theme={{
          algorithm: themeMode === "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm,
          token
        }}
      >
        <ThemeRoot>
          <AppInner
            ref={ref}
            {...rest}
          >
            {children}
          </AppInner >
        </ThemeRoot>
      </ConfigProvider>
    </AppFrontendContext.Provider>
  )
}))