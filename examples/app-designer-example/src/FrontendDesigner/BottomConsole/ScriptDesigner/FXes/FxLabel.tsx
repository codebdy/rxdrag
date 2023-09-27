import { memo, useCallback, useState } from "react"
import TreeNodeLabel from "../../common/TreeNodeLabel"
import { Button, Space } from "antd"
import { DeleteOutlined } from "@ant-design/icons"
import { FxPopover } from "./FxPopover"
import { IFxScript } from "../../../../interfaces/fx"
import { useRemoveFxScript } from "../../../../hooks/useRemoveFxScript"

export const FxLabel = memo((props: {
  fx: IFxScript,
}) => {
  const { fx } = props;
  const [open, setOpen] = useState<boolean>()
  const [remove, { loading }] = useRemoveFxScript()

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