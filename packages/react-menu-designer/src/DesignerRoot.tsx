import { memo, useCallback, useEffect, useState } from "react"
import { ActiveIdContext, HistoryContext, HistoryRedords, ItemsContext, OffsetLeftContext, OverIdContext, defautHistory, ResourcesContext } from "./contexts";
import { IMenuItem } from "./interfaces";
import { IFlattenedItem } from "./interfaces/flattened";
import { menuResources } from "./resources";
import { Identifier } from "./dnd/types";

export const DesignerRoot = memo((props: {
  defaultValue?: IMenuItem[],
  value?: IMenuItem[],
  children?: React.ReactNode,
}) => {
  const { defaultValue, value, children } = props;
  const itemsState = useState<IFlattenedItem[]>([]);
  const activeIdState = useState<Identifier | null>(null);
  const overIdState = useState<Identifier | null>(null);
  const offsetLeftState = useState(0);
  const historyState = useState<HistoryRedords>(defautHistory)
  const [, setHistoryState] = historyState
  const [, setItems] = itemsState

  const flatten = useCallback((
    items: IMenuItem[],
    parentId: Identifier | null = null,
    depth = 0
  ): IFlattenedItem[] => {
    return items.reduce<IFlattenedItem[]>((acc, item) => {
      return [
        ...acc,
        { ...item, parentId, depth, children: undefined },
        ...flatten(item.children || [], item.id, depth + 1),
      ];
    }, []);
  }, [])

  useEffect(() => {
    setHistoryState({
      undoList: [],
      redoList: [],
      changed: false,
    })

    setItems(flatten(defaultValue || []))
  }, [defaultValue, flatten, setHistoryState, setItems])

  useEffect(() => {
    setItems(flatten(value || []))
  }, [flatten, setItems, value])

  return (
    <ResourcesContext.Provider value={menuResources}>
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
    </ResourcesContext.Provider>
  )
})