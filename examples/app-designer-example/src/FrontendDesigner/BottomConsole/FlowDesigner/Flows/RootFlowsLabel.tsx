import { memo, useState } from "react"
import TreeNodeLabel from "../../common/TreeNodeLabel"
import { FlowPopover } from "./FlowPopover"

export const RootFlowsLabel = memo(() => {
  const [open, setOpen] = useState<boolean>()

  return (
    <TreeNodeLabel
      fixedAction={open}
      action={
        <FlowPopover
          open={open}
          onOpenChange={setOpen}
        />
      }
    >
      行为流
    </TreeNodeLabel>
  )
})