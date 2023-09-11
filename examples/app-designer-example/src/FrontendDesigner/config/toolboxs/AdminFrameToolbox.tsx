import { Tabs, TabsProps } from "antd"
import { memo, useMemo } from "react"
import { ResourceWidget } from "../../../ResourceWidget"

export const AdminFrameToolbox = memo(()=>{
  
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
  return(
    <Tabs items={items} />
  )
})