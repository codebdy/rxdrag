import { UserOutlined } from "@ant-design/icons"
import { Avatar, Layout, theme } from "antd"
import { forwardRef, memo, CSSProperties } from "react"
import { Trigger } from "../Trigger"

const { Header: AntdHeader, } = Layout

export type HeaderProps = {
  style?: CSSProperties
  hasTrigger?: boolean
}

export const Header = memo(forwardRef<HTMLDivElement, HeaderProps>((
  props, ref) => {
  const { hasTrigger = true, style, ...other } = props;
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <AntdHeader
      ref={ref}
      style={{ padding: 0, paddingRight: 16, background: colorBgContainer, position: "sticky", top: 0, zIndex: 1, display: "flex", alignItems: "center", ...style }}
      {...other}
    >
      {hasTrigger && <Trigger />}
      <div style={{ flex: 1 }}></div>
      <Avatar icon={<UserOutlined />} />
    </AntdHeader>
  )
}))