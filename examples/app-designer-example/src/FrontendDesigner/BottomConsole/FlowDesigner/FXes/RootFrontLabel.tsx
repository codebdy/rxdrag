import { memo, useState } from "react"
import TreeNodeLabel from "../../common/TreeNodeLabel"
import { FrontFxPopover } from "./FrontFxPopover"

export const RootCurrentLabel = memo(() => {
  const [open, setOpen] = useState<boolean>()

  return (
    <TreeNodeLabel
      fixedAction={open}
      action={
        <FrontFxPopover
          open={open}
          onOpenChange={setOpen}
        />
      }
    >
      当前模块
    </TreeNodeLabel>
  )
})