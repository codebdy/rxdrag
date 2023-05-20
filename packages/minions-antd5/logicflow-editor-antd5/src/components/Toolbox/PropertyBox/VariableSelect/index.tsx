/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAllControllers, useController } from "@rxdrag/minions-controller-editor"
import { useSelectedNode } from "@rxdrag/minions-logicflow-editor"
import { Select } from "antd"
import React from "react"
import { memo, useMemo } from "react"

export const VariableSelect = memo((
  props: {
    value?: string,
    onChange?: (value?: string,) => void
  }
) => {
  const { value, onChange } = props
  const controllers = useAllControllers()
  const currentController = useController()
  const selectedReactionNode = useSelectedNode()
  const targetController = useMemo(() => {
    const ctrl = controllers.find(ctrl => ctrl.id === (selectedReactionNode?.config as any)?.controllerId)
    const controller = (currentController as any)?.id === ctrl?.id ? currentController : ctrl
    return controller
  }, [controllers, currentController, selectedReactionNode?.config])

  return (
    <Select
      value={value}
      options={
        targetController?.variables?.map((variable: { name: any }) => {
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