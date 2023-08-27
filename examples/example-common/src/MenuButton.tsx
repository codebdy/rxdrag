import { MenuOutlined } from "@ant-design/icons"
import { Button, Dropdown, MenuProps } from "antd"
import { memo } from "react"
import { routes } from "./routes";


const items: MenuProps['items'] = [
  {
    label: <a href={routes.index}>常规编辑器</a>,
    key: 'normal',
  },
  {
    label: <a href={routes.inline}>内联编辑器</a>,
    key: 'inline',
  },
  {
    label: 'IFrame内联编辑器',
    key: 'iframe',
  },
  {
    label: '可缩放画布',
    key: 'zoom',
  },
  {
    label: <a href={routes.logicflow}>编排编辑器</a>,
    key: 'logicflow',
  },
  {
    label: <a href={routes.controller}>控制器编辑器</a>,
    key: 'controller',
  },
  {
    label: <a href={"#"}>工作流表单编辑器</a>,
    key: 'workflow',
  },
  {
    label: <a href={"#"}>大屏编辑</a>,
    key: 'bigscreen',
  },
  {
    label: <a href={"#"}>H5编辑器</a>,
    key: 'h5',
  },
  {
    //引入外部包
    label: <a href={"#"}>树形菜单编辑器</a>,
    key: 'menuTree',
  },
  {
    //引入外部包
    label: <a href={"#"}>UML编辑器</a>,
    key: 'uml',
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