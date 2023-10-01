import { memo, useState } from "react"
import TreeNodeLabel from "../../common/TreeNodeLabel"
import { FlowPopover } from "../FlowPopover"
import { useModule } from "../../../hooks/useModule"
import { LogicType } from "../../../../interfaces/flow"
import { ListNode } from "./ListNode"

export const ListNodeLabel = memo((
  props: {
    listNode: ListNode
  }
) => {
  const { listNode } = props;
  const [open, setOpen] = useState<boolean>()
  const module = useModule()
  const ctrlMeta = listNode.node.meta?.["x-controller"]
  const title = ctrlMeta?.name || listNode.node.title;

  return (
    <TreeNodeLabel
      fixedAction={open}
      action={
        module
          ? <FlowPopover
            title={"添加行为流"}
            ownerId={ctrlMeta?.id}
            moduleId={module.id}
            type={LogicType.normal}
            open={open}
            onOpenChange={setOpen}
          />
          : <></>
      }
    >
      {title}
    </TreeNodeLabel>
  )
})