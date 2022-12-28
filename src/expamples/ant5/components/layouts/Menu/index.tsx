import { memo } from "react"
import { Menu as AntdMenu } from "antd"
import { UserOutlined, VideoCameraOutlined, UploadOutlined } from "@ant-design/icons"

export const Menu = memo(() => {
  return (
    <AntdMenu
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
  )
})