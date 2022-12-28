import { Layout, theme } from "antd"
import { forwardRef, memo, CSSProperties } from "react"

const { Header: AntdHeader, } = Layout

export type HeaderProps = {
  style?: CSSProperties,
  children?:React.ReactNode,
}

export const HeaderInner = memo(forwardRef<HTMLDivElement, HeaderProps>((
  props, ref) => {
    const {style, children, ...other} = props;
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <AntdHeader
      ref={ref}
      style={{ padding: 0, paddingRight: 16, background: colorBgContainer, position: "sticky", top: 0, zIndex: 1, display: "flex", alignItems: "center", ...style }}
      {...other}
    >
      {children}
    </AntdHeader>
  )
}))