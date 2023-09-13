import { UniqueIdentifier } from "@dnd-kit/core";
import { memo, useState } from "react"
import { ActiveIdContext, ItemsContext, OffsetLeftContext, OverIdContext, initialItems } from "./contexts";

export const DesignerRoot = memo((props: {
  children?: React.ReactNode
}) => {
  const { children } = props;
  const itemsState = useState(() => initialItems);
  const activeIdState = useState<UniqueIdentifier | null>(null);
  const overIdState = useState<UniqueIdentifier | null>(null);
  const offsetLeftState = useState(0);

  return (
    <ItemsContext.Provider value={itemsState}>
      <ActiveIdContext.Provider value={activeIdState}>
        <OverIdContext.Provider value={overIdState}>
          <OffsetLeftContext.Provider value={offsetLeftState}>
              {children}
          </OffsetLeftContext.Provider>
        </OverIdContext.Provider>
      </ActiveIdContext.Provider>
    </ItemsContext.Provider>
  )
})