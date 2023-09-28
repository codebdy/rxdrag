import { memo, useState } from "react"
import TreeNodeLabel from "../../common/TreeNodeLabel"
import { ScriptPopover } from "../ScriptPopover"
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
        <ScriptPopover
          title="添加子脚本"
          type={LogicType.fx}
          scope={scope}
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