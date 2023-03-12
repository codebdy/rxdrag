import { Select } from "antd"
import { memo, useMemo } from "react"
import { IControllerMeta } from "runner/minions/interfaces/metas"
import { useController } from "../../../hooks/useController"
import { useControllerNodes } from "../../../hooks/useControllerNodes"
import { useSelectedNode } from "../../../hooks/useSelectedNode"

export const VariableSelect = memo((
  props: {
    value?: string,
    onChange?: (value?: string,) => void
  }
) => {
  const { value, onChange } = props
  const controllerNodes = useControllerNodes()
  const currentController = useController()
  const selectedReactionNode = useSelectedNode()
  const targetController = useMemo(() => {
    const node = controllerNodes.find(node => node.meta?.["x-reactions"]?.id === selectedReactionNode?.config?.controllerId)
    const controller: IControllerMeta = currentController?.id === node?.meta?.["x-reactions"]?.id ? currentController : node?.meta?.["x-reactions"]
    return controller
  }, [controllerNodes, currentController, selectedReactionNode?.config?.controllerId])

  return (
    <Select
      value={value}
      options={
        targetController?.variables?.map(variable => {
          return {
            value: variable.name,
            label: variable.name
          }
        })
      }
      onChange={onChange}
    />
  )
})