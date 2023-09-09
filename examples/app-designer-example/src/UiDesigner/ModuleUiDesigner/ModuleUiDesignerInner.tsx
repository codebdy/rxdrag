import { ZoomableEditor } from "@rxdrag/react-antd-shell"
import { Tabs, TabsProps } from "antd"
import { memo, useMemo } from "react"
import { ResourceWidget } from "../../ResourceWidget"
import { IDocumentSchema, INodeSchema } from "@rxdrag/schema"
import { useParams } from "react-router-dom"

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


export const ModuleUiDesignerInner = memo(() => {
  const { moduleId } = useParams()
  console.log("====>moduleId", moduleId)
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