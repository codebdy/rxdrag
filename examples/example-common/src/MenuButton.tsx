import { MenuOutlined } from "@ant-design/icons"
import { Button, Dropdown, MenuProps } from "antd"
import { memo } from "react"
import { routes } from "./routes";


const items: MenuProps['items'] = [
  {
    label: <a href={routes.normal}>常规编辑器</a>,
    key: routes.normal,
  },
  // {
  //   label: 'IFrame内联编辑器',
  //   key: 'iframe',
  // },
  // {
  //   label: '可缩放画布',
  //   key: 'zoom',
  // },
  {
    label: <a href={routes.logicflow}>编排编辑器</a>,
    key: routes.logicflow,
  },
  // {
  //   label: <a href={"#"}>工作流表单编辑器</a>,
  //   key: 'workflow',
  // },
  {
    label: <a href={routes.largeScreen}>大屏编辑</a>,
    key: routes.largeScreen,
  },
  // {
  //   label: <a href={"#"}>H5编辑器</a>,
  //   key: 'h5',
  // },
  {
    label: <a href={routes.runtime} target="_blank">运行时示例</a>,
    key: routes.runtime,
  },
  // {
  //   //引入外部包
  //   label: <a href={"#"}>树形菜单编辑器</a>,
  //   key: 'menuTree',
  // },
  // {
  //   //引入外部包
  //   label: <a href={"#"}>UML编辑器</a>,
  //   key: 'uml',
  // },
  {
    //引入外部包
    label: <a href={routes.appDesigner}>低码APP设计器</a>,
    key: routes.appDesigner,
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