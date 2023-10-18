import { useMetaId } from "UmlEditor/hooks/useMetaId";
import { useSelectedGraphLogic } from "UmlEditor/hooks/useSelectedGraphLogic";
import { useSubLogicFlows } from "UmlEditor/hooks/useSubLogicFlows";
import { Select } from "antd";
import { memo, useCallback } from "react"

export const SubLogicFlowSelect = memo((
  props: {
    value?: string,
    onChange?: (value?: string) => void
  }
) => {
  const { value, onChange } = props
  const metaId = useMetaId();
  const subFlows = useSubLogicFlows(metaId || "")
  const current = useSelectedGraphLogic()
  const hanldeSubFlowChange = useCallback((subFlowId: string) => {
    onChange?.(subFlowId)
  }, [onChange])

  return (
    <Select
      value={value}
      options={subFlows?.filter(subflow => subflow.uuid !== current?.uuid)?.map((subFlow) => ({ value: subFlow.uuid, label: subFlow.name }))}
      onChange={hanldeSubFlowChange}
    />
  )
})