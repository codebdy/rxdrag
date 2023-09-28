import { memo, useCallback, useState } from "react"
import TreeNodeLabel from "../../common/TreeNodeLabel"
import { Button, Space } from "antd"
import { DeleteOutlined } from "@ant-design/icons"
import { IScript, LogicType } from "../../../../interfaces/flow"
import { useRemoveScript } from "../../../../hooks/useRemoveScript"
import { ScriptPopover } from "../ScriptPopover"

export const ScriptLabel = memo((props: {
  script: IScript,
}) => {
  const { script } = props;
  const [open, setOpen] = useState<boolean>()

  const [remove, { loading }] = useRemoveScript()

  const handleRemove = useCallback(() => {
    remove(script.id)
  }, [remove, script.id])

  return (
    <TreeNodeLabel
      fixedAction={open}
      action={
        <Space>
          <ScriptPopover
            title="编辑子脚本"
            type={LogicType.fx}
            open={open}
            script={script}
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
      {script.name}
    </TreeNodeLabel>
  )
})