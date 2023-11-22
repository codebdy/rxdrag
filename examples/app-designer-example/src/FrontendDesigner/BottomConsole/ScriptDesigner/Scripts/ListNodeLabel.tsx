import { memo, useState } from "react"
import TreeNodeLabel from "../../common/TreeNodeLabel"
import { useModule } from "../../../hooks/useModule"
import { LogicType } from "../../../../interfaces/flow"
import { ListNode } from "../../FlowDesigner/Flows/ListNode"
import { ScriptPopover } from "../ScriptPopover"

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
          ? <ScriptPopover
            title={"添加脚本"}
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