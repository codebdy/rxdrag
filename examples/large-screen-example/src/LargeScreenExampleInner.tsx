import { memo, useMemo } from "react"
import { Toolbar } from "./Toolbar"
import { ZoomableEditor } from "@rxdrag/react-antd-shell"
import styled from "styled-components"
import { INodeSchema, IViewSchema } from "@rxdrag/schema"
import { LeftSide } from "./LeftSide"
import { ResourceWidget } from "./ResourceWidget"
import { Tabs, TabsProps } from "antd"

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-flow: column;
  box-sizing: border-box;
  background-color: ${props => props.theme.token?.colorBgContainer};
  color: ${props => props.theme.token?.colorText};
`

//设备端的编辑区
const AppDeviceArea = styled.div`
  flex:1;
  display: flex;
  height: 0;
`
const rootNodeSchema: INodeSchema = {
  componentName: "RootBoard"
}

const schemas: IViewSchema[] = [
  {
    title: "首页",
    schema: rootNodeSchema,
  },
]


export const LargeScreenExampleInner = memo(() => {


  const items: TabsProps['items'] = useMemo(() => {
    return [
      {
        label: "组件",
        key: "components",
        children: <ResourceWidget />
      },
      {
        label: "素材",
        key: "materials",
        children: "素材列表"
      },
      {
        label: "模板",
        key: "templates",
        children: "方案/布局/组件"
      },
    ]
  }, [])
  return (
    <Container className="zoomable-editor">
      <Toolbar />
      <AppDeviceArea>
        <LeftSide />
        <ZoomableEditor
          toolbox={
            <Tabs
              items={items}
            />
          }
          schemas={schemas}
        />
      </AppDeviceArea>
    </Container>
  )
})