import { memo, useState } from "react"
import TreeNodeLabel from "../../common/TreeNodeLabel"
import { FxPopover } from "./FxPopover"
import { FxScope } from "../../../../interfaces/fx";
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
        <FxPopover
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