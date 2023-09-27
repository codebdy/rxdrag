import { memo, useCallback, useState } from "react"
import TreeNodeLabel from "../../common/TreeNodeLabel"
import { VariablePopover } from "./VariablePopover"

export const RootVarsLabel = memo(() => {
  const [open, setOpen] = useState<boolean>()

  const handleOpenAddVar = useCallback(() => {
    setOpen(true)
  }, [])
  
  return (
    <TreeNodeLabel
      fixedAction={open}
      action={
        <VariablePopover
          open={open}
          onOpenChange={setOpen}
        />
      }
    >
      变量
    </TreeNodeLabel>
  )
})