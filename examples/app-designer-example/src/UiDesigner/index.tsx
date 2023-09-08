import { ZoomableEditor } from "@rxdrag/react-antd-shell"
import { INodeSchema, IDocumentSchema } from "@rxdrag/schema"
import { TabsProps, Tabs } from "antd"
import { memo, useMemo, useState } from "react"
import styled from "styled-components"
import { NavType, LeftSide } from "../LeftSide"
import { ResourceWidget } from "../ResourceWidget"
import { DeviceType } from "../interfaces"

//设备端的编辑区
const AppDeviceArea = styled.div`
    flex:1;
    display: flex;
    height: 0;
  `

const rootNodeSchema: INodeSchema = {
  componentName: "Page"
}

const schemas: IDocumentSchema[] = [
  {
    title: "首页",
    schema: rootNodeSchema,
  },
  {
    title: "详情",
    schema: rootNodeSchema,
  }
]

export const UiDesigner = memo((
  props: {
    device: DeviceType,
  }
) => {
  const { device } = props;
  const [navKey, setNavKey] = useState<NavType>(NavType.moudules)
  const items: TabsProps['items'] = useMemo(() => {
    return [
      {
        label: "组件",
        key: "components",
        children: <ResourceWidget />
      },
      {
        label: "模板",
        key: "templates",
        children: "方案/布局/组件"
      },
    ]
  }, [])
  return (
    <AppDeviceArea>
      <LeftSide navKey={navKey} onNavKeyChange={setNavKey} />
      <ZoomableEditor
        toolbox={
          <Tabs
            items={items}
          />
        }
        schemas={schemas}
      />
    </AppDeviceArea>
  )
})