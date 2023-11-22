import { memo, useState } from "react"
import TreeNodeLabel from "../../common/TreeNodeLabel"
import { ScriptPopover } from "../ScriptPopover"
import { LogicType } from "../../../../interfaces/flow"
import { useModule } from "../../../hooks/useModule"

export const RootLabel = memo(() => {
  const [open, setOpen] = useState<boolean>()
  const module = useModule()
  return (
    <TreeNodeLabel
      fixedAction={open}
      action={
        <ScriptPopover
          title="添加脚本"
          ownerId={module?.id}
          moduleId={module?.id}
          type={LogicType.normal}
          open={open}
          onOpenChange={setOpen}
        />
      }
    >
      根目录
    </TreeNodeLabel>
  )
})