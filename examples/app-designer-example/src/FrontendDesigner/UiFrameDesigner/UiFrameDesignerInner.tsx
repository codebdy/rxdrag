import { ZoomableEditor } from "@rxdrag/react-antd-shell"
import { Tabs, TabsProps } from "antd"
import { memo, useMemo } from "react"
import { ResourceWidget } from "../../ResourceWidget"
import { IDocumentSchema } from "@rxdrag/schema"
import { useAppFrontend } from "../../hooks/useAppFrontend"

export const UiFrameDesignerInner = memo(() => {
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
  const appFront = useAppFrontend()

  const schemas: (IDocumentSchema[]) | undefined = useMemo(() => appFront?.frameSchema ? [
    {
      title: "页面框架",
      schema: appFront.frameSchema,
    },
  ] : undefined, [appFront?.frameSchema])

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