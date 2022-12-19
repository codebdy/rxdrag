import { Switch } from "antd"
import { useCurrentNode } from "core-react/hooks/useCurrentNode"
import { memo, useMemo } from "react"

export const SlotSwitch = memo((props: {
  name?: string
}) => {
  const { name } = props
  const node = useCurrentNode()

  const checked = useMemo(() => {
    return name ? !!node?.slots?.[name] : false
  }, [name, node?.slots])
  console.log("哈哈", node)
  return (
    <Switch checked={checked || false} />
  )
})