import { ZoomableEditor } from "@rxdrag/react-antd-shell"
import { Tabs, TabsProps } from "antd"
import { memo, useMemo } from "react"
import { ResourceWidget } from "../../ResourceWidget"
import { useParams } from "react-router-dom"
import { useQueryModule } from "../../hooks/useQueryModule"

export const ModuleUiDesignerInner = memo(() => {
  const { moduleId } = useParams()

  const { module } = useQueryModule(moduleId || "")

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
    module
      ? <ZoomableEditor
        toolbox={
          <Tabs
            items={items}
          />
        }
        schemas={module?.scenes}
      />
      : <></>
  )
})