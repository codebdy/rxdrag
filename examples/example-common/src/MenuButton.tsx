import { MenuOutlined } from "@ant-design/icons"
import { Button, Dropdown, MenuProps } from "antd"
import { memo } from "react"
import { routes } from "./routes";


const items: MenuProps['items'] = [
  {
    label: <a href={routes.index}>常规编辑器</a>,
    key: '0',
  },
  {
    label: <a href={routes.inline}>内联编辑器</a>,
    key: '1',
  },
  {
    label: 'IFrame内联编辑器',
    key: '2',
  },
  {
    label: <a href={routes.logicflow}>编排编辑器</a>,
    key: '3',
  },
  {
    label: <a href={routes.controller}>控制器编辑器</a>,
    key: '4',
  },
];

export const MenuButton = memo(() => {
  return (
    <Dropdown
      menu={{
        items,
        //selectable: true,
        //defaultSelectedKeys: ['0'],
      }}
      trigger={['click']}
    >
      <Button icon={<MenuOutlined />} />
    </Dropdown>
  )
})