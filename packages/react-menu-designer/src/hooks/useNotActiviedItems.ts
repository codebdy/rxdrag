import { useMemo } from "react";
import { useActiveIdState } from "./useActiveIdState";
import { useItemsState } from "./useItemsState";
import { useIsChildOf } from "./useIsChildOf";

export function useNotActiviedItems() {
  const [activeId] = useActiveIdState()
  const [items] = useItemsState()
  const isChildOf = useIsChildOf()

  const notActivitiedItems = useMemo(() => {
    if (!activeId) {
      return items
    }
    return items.filter(item => item.id !== activeId && !isChildOf(item.id, activeId))
  }, [activeId, isChildOf, items])

  return notActivitiedItems
}