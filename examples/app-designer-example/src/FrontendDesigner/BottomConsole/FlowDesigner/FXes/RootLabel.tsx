import { memo, useState } from "react"
import TreeNodeLabel from "../../common/TreeNodeLabel"
import { FlowPopover } from "../FlowPopover"
import { FxScope, LogicType } from "../../../../interfaces/flow";
import { ID } from "@rxdrag/shared";

export const RootLabel = memo((
  props: {
    scope: FxScope,
    ownerId?: ID,
    title?: string,
  }
) => {
  const { scope, ownerId, title } = props;
  const [open, setOpen] = useState<boolean>()

  return (
    <TreeNodeLabel
      fixedAction={open}
      action={
        <FlowPopover
          title="添加子流"
          scope={scope}
          type={LogicType.fx}
          ownerId={ownerId}
          open={open}
          onOpenChange={setOpen}
        />
      }
    >
      {title}
    </TreeNodeLabel>
  )
})