import { memo, useEffect, useState } from "react"
import { ActiveIdContext, HistoryContext, HistoryRedords, ItemsContext, defautHistory, ResourcesContext } from "./contexts";
import { IMenuItem } from "./interfaces";
import { menuResources } from "./resources";
import { Identifier } from "./dnd/types";
import { IFlattenedItem } from "./interfaces/flattened";

export const DesignerRoot = memo((props: {
  defaultValue?: IMenuItem[],
  value?: IMenuItem[],
  children?: React.ReactNode,
}) => {
  const { defaultValue, value, children } = props;
  const itemsState = useState<IFlattenedItem[]>([]);
  const activeIdState = useState<Identifier | null>(null);
  const historyState = useState<HistoryRedords>(defautHistory)
  const [, setHistoryState] = historyState
  const [, setItems] = itemsState

  useEffect(() => {
    if (defaultValue !== undefined) {
      setHistoryState({
        undoList: [],
        redoList: [],
        changed: false,
      })
      setItems(defaultValue ?? JSON.parse(JSON.stringify(defaultValue)))
    }
  }, [defaultValue, setHistoryState, setItems])

  useEffect(() => {
    if (value !== undefined) {
      setItems(value ?? JSON.parse(JSON.stringify(value)))
    }
  }, [value, setItems])

  return (
    <ResourcesContext.Provider value={menuResources}>
      <ItemsContext.Provider value={itemsState}>
        <ActiveIdContext.Provider value={activeIdState}>
          <HistoryContext.Provider value={historyState}>
            {children}
          </HistoryContext.Provider>
        </ActiveIdContext.Provider>
      </ItemsContext.Provider>
    </ResourcesContext.Provider>
  )
})