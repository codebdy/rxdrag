import { UniqueIdentifier } from "@dnd-kit/core";
import { memo, useEffect, useState } from "react"
import { ActiveIdContext, HistoryContext, HistoryRedords, ItemsContext, OffsetLeftContext, OverIdContext, defautHistory, initialItems } from "./contexts";
import { IMenuItem } from "./interfaces";

export const DesignerRoot = memo((props: {
  defaultValue?: IMenuItem[],
  value?: IMenuItem[],
  children?: React.ReactNode,
}) => {
  const { defaultValue, value, children } = props;
  const itemsState = useState(() => initialItems);
  const activeIdState = useState<UniqueIdentifier | null>(null);
  const overIdState = useState<UniqueIdentifier | null>(null);
  const offsetLeftState = useState(0);
  const historyState = useState<HistoryRedords>(defautHistory)

  useEffect(() => {
    //
  }, [defaultValue])

  
  useEffect(() => {
    //
  }, [value])

  return (
    <ItemsContext.Provider value={itemsState}>
      <ActiveIdContext.Provider value={activeIdState}>
        <OverIdContext.Provider value={overIdState}>
          <OffsetLeftContext.Provider value={offsetLeftState}>
            <HistoryContext.Provider value={historyState}>
              {children}
            </HistoryContext.Provider>
          </OffsetLeftContext.Provider>
        </OverIdContext.Provider>
      </ActiveIdContext.Provider>
    </ItemsContext.Provider>
  )
})