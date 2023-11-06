import { memo, useState } from "react"
import TreeNodeLabel from "../../common/TreeNodeLabel"
import { FlowPopover } from "../FlowPopover"
import { useModule } from "../../../hooks/useModule"
import { LogicType } from "../../../../interfaces/flow"

export const RootFlowsLabel = memo(() => {
  const [open, setOpen] = useState<boolean>()
  const module = useModule()
  return (
    <TreeNodeLabel
      fixedAction={open}
      action={
        module
          ? <FlowPopover
            title={"添加行为流"}
            ownerId={module.id}
            moduleId={module.id}
            type={LogicType.normal}
            open={open}
            onOpenChange={setOpen}
          />
          : <></>
      }
    >
      全局流
    </TreeNodeLabel>
  )
})