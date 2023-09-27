import { memo, useState } from "react"
import TreeNodeLabel from "../../common/TreeNodeLabel"
import { ScriptPopover } from "./ScriptPopover"

export const RootLabel = memo(() => {
  const [open, setOpen] = useState<boolean>()

  return (
    <TreeNodeLabel
      fixedAction={open}
      action={
        <ScriptPopover
          open={open}
          onOpenChange={setOpen}
        />
      }
    >
      根目录
    </TreeNodeLabel>
  )
})