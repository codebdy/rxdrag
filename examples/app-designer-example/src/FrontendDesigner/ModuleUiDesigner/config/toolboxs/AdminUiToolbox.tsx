import { Tabs, TabsProps } from "antd"
import { memo, useMemo } from "react"
import { resources } from "example-common"
import { ResourceWidget } from "../../../../ResourceWidget"

export const AdminUiToolbox = memo(() => {

  const items: TabsProps['items'] = useMemo(() => {
    return [
      {
        label: "组件",
        key: "components",
        children: <ResourceWidget resources = {resources}/>
      },
      {
        label: "模板",
        key: "templates",
        children: "方案/布局/组件"
      },
    ]
  }, [])
  return (
    <Tabs items={items} />
  )
})