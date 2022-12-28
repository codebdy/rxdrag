import { UploadOutlined, UserOutlined, VideoCameraOutlined } from "@ant-design/icons"
import { Layout, Menu } from "antd"
import { forwardRef, memo } from "react"
import { useLayoutParams } from "../context"
import { Trigger } from "../Trigger"

const { Sider: AntdSider, } = Layout

export type SiderProps = {
  hasTrigger?: boolean
}

export const Sider = memo(forwardRef<HTMLDivElement, SiderProps>((
  props, ref) => {
  const { hasTrigger, ...other } = props;
  const { collapsed } = useLayoutParams() || {}
  return (
    <AntdSider
      ref={ref}
      trigger={hasTrigger ? <Trigger /> : null}
      collapsible
      collapsed={collapsed}
      {...other}
    >
      <div className="logo" />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['1']}
        items={[
          {
            key: '1',
            icon: <UserOutlined />,
            label: 'nav 1',
          },
          {
            key: '2',
            icon: <VideoCameraOutlined />,
            label: 'nav 2',
          },
          {
            key: '3',
            icon: <UploadOutlined />,
            label: 'nav 3',
          },
        ]}
      />
    </AntdSider>
  )
}))