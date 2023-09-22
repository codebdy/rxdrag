import { forwardRef, memo } from "react"
import { ConfigProvider, GlobalToken, theme } from "antd"
import { RootBoardInner, RootBoardInnerProps } from "./RootBoardInner"
import { ThemeMode, ThemeRoot } from "./ThemeRoot"

export type RootBoardProps = {
  themeMode?: ThemeMode,
  //主题自定义信息token，做一个编辑setter
  token?: GlobalToken,
} & RootBoardInnerProps

export const RootBoard = memo(forwardRef<HTMLDivElement, RootBoardProps>((props, ref) => {
  const { themeMode = "dark", children, token, ...rest } = props
  return (
    <ConfigProvider
      theme={{
        algorithm: themeMode === "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token
      }}
    >
      <ThemeRoot>
        <RootBoardInner
          ref={ref}

          {...rest}
        >
          {children}
        </RootBoardInner >
      </ThemeRoot>
    </ConfigProvider>
  )
}))