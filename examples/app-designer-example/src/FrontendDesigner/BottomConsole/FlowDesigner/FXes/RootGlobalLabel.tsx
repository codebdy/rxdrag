import { memo, useState } from "react"
import TreeNodeLabel from "../../common/TreeNodeLabel"
import { AppFxPopover } from "./AppFxPopover"

export const RootFrontLabel = memo(() => {
  const [open, setOpen] = useState<boolean>()

  return (
    <TreeNodeLabel
      fixedAction={open}
      action={
        <AppFxPopover
          open={open}
          onOpenChange={setOpen}
        />
      }
    >
      全局
    </TreeNodeLabel>
  )
})