import { memo, useCallback, useState } from "react"
import TreeNodeLabel from "../../common/TreeNodeLabel"
import { IFlow } from "../../../../interfaces/flow"
import { Button, Space } from "antd"
import { DeleteOutlined } from "@ant-design/icons"
import { useSaveModule } from "../../../../hooks/useSaveModule"
import { useModule } from "../../../hooks/useModule"
import { FlowPopover } from "./FlowPopover"

export const FlowLabel = memo((props: {
  flow: IFlow,
}) => {
  const { flow } = props;
  const [open, setOpen] = useState<boolean>()
  const module = useModule()

  const [saveModule, { loading }] = useSaveModule({
    onComplate: () => {
      setOpen(false)
    }
  })

  const handleRemove = useCallback(() => {
    if (module) {
      const newModule = { ...module, flows: module.flows?.filter(vr => vr.id !== flow.id) }
      saveModule(newModule)
    }
  }, [module, saveModule, flow.id])

  return (
    <TreeNodeLabel
      fixedAction={open}
      action={
        <Space>
          <FlowPopover
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