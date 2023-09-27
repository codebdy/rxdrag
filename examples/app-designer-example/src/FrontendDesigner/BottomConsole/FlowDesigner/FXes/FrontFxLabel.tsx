import { memo, useCallback, useState } from "react"
import TreeNodeLabel from "../../common/TreeNodeLabel"
import { IScopedILogicFlow } from "../../../../interfaces/flow"
import { Button, Space } from "antd"
import { DeleteOutlined } from "@ant-design/icons"
import { FrontFxPopover } from "./FrontFxPopover"
import { useSaveFrontend } from "../../../../hooks/useSaveFrontend"
import { useAppFrontend } from "../../../../hooks/useAppFrontend"
import { IAppFrontend } from "../../../../interfaces"

export const FrontFxLabel = memo((props: {
  fx: IScopedILogicFlow,
}) => {
  const { fx } = props;
  const [open, setOpen] = useState<boolean>()
  const front = useAppFrontend()

  const [saveFront, { loading }] = useSaveFrontend({
    onComplate: () => {
      setOpen(false)
    }
  })

  const handleRemove = useCallback(() => {
    if (front) {
      const newFront: IAppFrontend = { ...front, fxFlows: front.fxFlows?.filter(fxFlow => fxFlow.id !== fx.id) }
      saveFront(newFront)
    }
  }, [front, saveFront, fx.id])

  return (
    <TreeNodeLabel
      fixedAction={open}
      action={
        <Space>
          <FrontFxPopover
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