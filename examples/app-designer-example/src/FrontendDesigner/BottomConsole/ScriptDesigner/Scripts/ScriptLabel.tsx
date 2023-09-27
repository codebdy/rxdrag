import { memo, useCallback, useState } from "react"
import TreeNodeLabel from "../../common/TreeNodeLabel"
import { Button, Space } from "antd"
import { DeleteOutlined } from "@ant-design/icons"
import { useSaveModule } from "../../../../hooks/useSaveModule"
import { useModule } from "../../../hooks/useModule"
import { ScriptPopover } from "./ScriptPopover"
import { IScript } from "../../../../interfaces/script"
import { IModule } from "../../../../interfaces/module"

export const ScriptLabel = memo((props: {
  script: IScript,
}) => {
  const { script } = props;
  const [open, setOpen] = useState<boolean>()
  const module = useModule()

  const [saveModule, { loading }] = useSaveModule({
    onComplate: () => {
      setOpen(false)
    }
  })

  const handleRemove = useCallback(() => {
    if (module) {
      const newModule: IModule = { ...module, scripts: module.scripts?.filter(vr => vr.id !== script.id) }
      saveModule(newModule)
    }
  }, [module, saveModule, script.id])

  return (
    <TreeNodeLabel
      fixedAction={open}
      action={
        <Space>
          <ScriptPopover
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