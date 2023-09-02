import { CSSProperties, forwardRef, memo } from "react"
import styled from "styled-components"
import classNames from "classnames"
import { ConfigProvider, GlobalToken, theme } from "antd"

const Container = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100%;
  min-width: 100%;
`

export interface IRootBoardProps {
  themeMode?: "dark" | "light",
  backgroundImage?: string,
  className?: string,
  children?: React.ReactNode,
  style?: CSSProperties,
  //主题自定义信息token，做一个编辑setter
  token?: GlobalToken,
}

export const RootBoard = memo(forwardRef<HTMLDivElement, IRootBoardProps>((props, ref) => {
  const { themeMode = "dark", backgroundImage, style, className, children, token, ...rest } = props
  return (
    <ConfigProvider
      theme={{
        algorithm: themeMode === "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token
      }}
    >
      <Container
        ref={ref}
        className={classNames("main-board", className)}
        style={{
          backgroundImage: backgroundImage,
          ...style
        }}
        {...rest}
      >
        {children}
      </Container >
    </ConfigProvider>
  )
}))