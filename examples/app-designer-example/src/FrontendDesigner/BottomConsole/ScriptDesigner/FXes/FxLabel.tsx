import { memo, useCallback, useState } from "react"
import TreeNodeLabel from "../../common/TreeNodeLabel"
import { Button, Space } from "antd"
import { DeleteOutlined } from "@ant-design/icons"
import { ScriptPopover } from "../ScriptPopover"
import { IScript, LogicType } from "../../../../interfaces/flow"
import { useRemoveScript } from "../../../../hooks/useRemoveScript"

export const FxLabel = memo((props: {
  fx: IScript,
}) => {
  const { fx } = props;
  const [open, setOpen] = useState<boolean>()
  const [remove, { loading }] = useRemoveScript()

  const handleRemove = useCallback(() => {
    remove(fx.id)
  }, [remove, fx.id])

  return (
    <TreeNodeLabel
      fixedAction={open}
      action={
        <Space>
          <ScriptPopover
            title="编辑脚本"
            type={LogicType.normal}
            scope={fx.scope}
            ownerId={fx.ownerId}
            open={open}
            script={fx}
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