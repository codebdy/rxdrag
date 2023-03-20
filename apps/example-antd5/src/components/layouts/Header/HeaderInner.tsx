import { Layout, theme } from "antd"
import { forwardRef, memo, CSSProperties } from "react"
import "./style.less"

const { Header: AntdHeader, } = Layout

export type HeaderProps = {
  style?: CSSProperties,
  children?: React.ReactNode,
  sticky?: boolean,
}

export const HeaderInner = memo(forwardRef<HTMLDivElement, HeaderProps>((
  props, ref) => {
  const { style, children, ...other } = props;
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <AntdHeader
      ref={ref}
      className="rx-top-bar"
      style={{ background: colorBgContainer, ...style }}
      {...other}
    >
      {children}
    </AntdHeader>
  )
}))