import { memo, useCallback, useState } from "react"
import TreeNodeLabel from "../../common/TreeNodeLabel"
import { IVariable } from "../../../../interfaces/flow"
import { Button, Space } from "antd"
import { DeleteOutlined } from "@ant-design/icons"
import { VariablePopover } from "./VariablePopover"
import { useSaveModule } from "../../../../hooks/useSaveModule"
import { useModule } from "../../../hooks/useModule"

export const VariableLabel = memo((props: {
  variable: IVariable,
}) => {
  const { variable } = props;
  const [open, setOpen] = useState<boolean>()
  const module = useModule()

  const [saveModule, { loading }] = useSaveModule({
    onComplete: () => {
      setOpen(false)
    }
  })

  const handleRemove = useCallback(() => {
    if (module) {
      const newModule = { ...module, variables: module.variables?.filter(vr => vr.id !== variable.id) }
      saveModule(newModule)
    }
  }, [module, saveModule, variable.id])

  return (
    <TreeNodeLabel
      fixedAction={open}
      action={
        <Space>
          <VariablePopover
            open={open}
            variable={variable}
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
      {variable.name}
    </TreeNodeLabel>
  )
})