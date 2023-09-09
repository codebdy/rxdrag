import { ZoomableEditor } from "@rxdrag/react-antd-shell"
import { Tabs, TabsProps } from "antd"
import { memo, useMemo } from "react"
import { ResourceWidget } from "../../ResourceWidget"
import { IDocumentSchema, INodeSchema } from "@rxdrag/schema"

const rootNodeSchema: INodeSchema = {
  componentName: "Page"
}

const schemas: IDocumentSchema[] = [
  {
    title: "页面框架",
    schema: rootNodeSchema,
  },
]


export const FrameUiDesignerInner = memo(() => {
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
    <ZoomableEditor
      toolbox={
        <Tabs
          items={items}
        />
      }
      schemas={schemas}
    />
  )
})