import { memo, useCallback, useState } from "react"
import TreeNodeLabel from "../../common/TreeNodeLabel"
import { Button, Space } from "antd"
import { DeleteOutlined } from "@ant-design/icons"
import { useRemoveFlow } from "../../../../hooks/useRemoveFlow"
import { FlowPopover } from "../FlowPopover"
import { IFlow } from "../../../../interfaces/flow"

export const FxLabel = memo((props: {
  fx: IFlow,
}) => {
  const { fx } = props;
  const [open, setOpen] = useState<boolean>()
  const [remove, { loading }] = useRemoveFlow()

  const handleRemove = useCallback(() => {
    remove(fx.id)
  }, [remove, fx.id])

  return (
    <TreeNodeLabel
      fixedAction={open}
      action={
        <Space>
          <FlowPopover
            title = "编辑子流"
            scope={fx.scope}
            ownerId={fx.ownerId}
            type = {fx.type}
            open={open}
            flow={fx}
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
      {fx.name}
    </TreeNodeLabel>
  )
})