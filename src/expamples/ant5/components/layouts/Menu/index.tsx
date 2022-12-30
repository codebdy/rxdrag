import { forwardRef, memo } from "react"
import { Menu as AntdMenu, MenuRef } from "antd"
import { UserOutlined, VideoCameraOutlined, UploadOutlined } from "@ant-design/icons"

export const Menu = memo(forwardRef<MenuRef>((props, ref) => {
  return (
    <AntdMenu
      ref={ref}
      theme="dark"
      mode="inline"
      defaultSelectedKeys={['1']}
      items={[
        {
          key: '1',
          icon: <UserOutlined />,
          label: '工作台',
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
      {...props}
    />
  )
}))