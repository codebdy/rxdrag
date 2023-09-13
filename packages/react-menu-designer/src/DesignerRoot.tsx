import { UniqueIdentifier } from "@dnd-kit/core";
import { memo, useState } from "react"
import { ActiveIdContext, CurrentPositionContext, ItemsContext, OffsetLeftContext, OverIdContext, initialItems } from "./contexts";

export const DesignerRoot = memo((props: {
  children?: React.ReactNode
}) => {
  const { children } = props;
  const itemsState = useState(() => initialItems);
  const activeIdState = useState<UniqueIdentifier | null>(null);
  const overIdState = useState<UniqueIdentifier | null>(null);
  const offsetLeftState = useState(0);
  const currentPositionState = useState<{
    parentId: UniqueIdentifier | null;
    overId: UniqueIdentifier;
  } | null>(null);

  return (
    <ItemsContext.Provider value={itemsState}>
      <ActiveIdContext.Provider value={activeIdState}>
        <OverIdContext.Provider value={overIdState}>
          <OffsetLeftContext.Provider value={offsetLeftState}>
            <CurrentPositionContext.Provider value={currentPositionState}>
              {children}
            </CurrentPositionContext.Provider>
          </OffsetLeftContext.Provider>
        </OverIdContext.Provider>
      </ActiveIdContext.Provider>
    </ItemsContext.Provider>
  )
})