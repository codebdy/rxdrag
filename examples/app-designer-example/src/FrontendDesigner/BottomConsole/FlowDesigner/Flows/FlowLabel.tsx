import { memo, useCallback, useState } from "react"
import TreeNodeLabel from "../../common/TreeNodeLabel"
import { IFlow } from "../../../../interfaces/flow"
import { Button, Space } from "antd"
import { DeleteOutlined } from "@ant-design/icons"
import { FlowPopover } from "../FlowPopover"
import { useRemoveFlow } from "../../../../hooks/useRemoveFlow"

export const FlowLabel = memo((props: {
  flow: IFlow,
}) => {
  const { flow } = props;
  const [open, setOpen] = useState<boolean>()

  const [remove, { loading }] = useRemoveFlow({
    onComplete: () => {
      setOpen(false)
    }
  })

  const handleRemove = useCallback(() => {
    remove(flow.id)
  }, [remove, flow.id])

  return (
    <TreeNodeLabel
      fixedAction={open}
      action={
        <Space>
          <FlowPopover
            title="编辑行为流"
            ownerId={flow.ownerId}
            open={open}
            flow={flow}
            onOpenChange={setOpen}
          />
          <Button
            type="text"
            size="small"
            icon={<DeleteOutlined />}
            loading={loading}
            onClick={handleRemove}
          />
        </Space>
      }
    >
      {flow.name}
    </TreeNodeLabel>
  )
})