import { memo, useCallback, useState } from "react"
import TreeNodeLabel from "../../common/TreeNodeLabel"
import { Button, Space } from "antd"
import { DeleteOutlined } from "@ant-design/icons"
import { useRemoveFxFlow } from "../../../../hooks/useRemoveFxFlow"
import { FxPopover } from "./FxPopover"
import { IFxFlow } from "../../../../interfaces/fx"

export const FxLabel = memo((props: {
  fx: IFxFlow,
}) => {
  const { fx } = props;
  const [open, setOpen] = useState<boolean>()
  const [remove, { loading }] = useRemoveFxFlow()

  const handleRemove = useCallback(() => {
    remove(fx.id)
  }, [remove, fx.id])

  return (
    <TreeNodeLabel
      fixedAction={open}
      action={
        <Space>
          <FxPopover
            scope={fx.scope}
            ownerId={fx.ownerId}
            open={open}
            fx={fx}
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