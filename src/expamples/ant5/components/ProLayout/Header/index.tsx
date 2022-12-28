import { UserOutlined } from "@ant-design/icons"
import { Avatar, Layout, theme } from "antd"
import { memo } from "react"
import { Trigger } from "../../layouts/Trigger"

const { Header: AntdHeader,  } = Layout

export const Header = memo(() => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  
  return (
    <AntdHeader style={{ padding: 0, paddingRight: 16, background: colorBgContainer, position: "sticky", top: 0, zIndex: 1, display: "flex", alignItems: "center" }}>
      <Trigger />
      <div style={{ flex: 1 }}></div>
      <Avatar icon={<UserOutlined />} />
    </AntdHeader>
  )
})