import { useMemo } from "react";
import { useActiveIdState } from "./useActiveIdState";
import { useIsChildOf } from "./useIsChildOf";
import { useFlattenItems } from "./useFlattenItems";

export function useShowingItems() {
  const [activeId] = useActiveIdState()
  const items = useFlattenItems()
  const isChildOf = useIsChildOf()

  const showingItems = useMemo(() => {
    if (!activeId) {
      return items
    }
    return items.filter(item => !isChildOf(item.id, activeId))
  }, [activeId, isChildOf, items])

  return showingItems
}