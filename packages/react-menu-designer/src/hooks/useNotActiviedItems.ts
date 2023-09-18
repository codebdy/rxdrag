import { useMemo } from "react";
import { useActiveIdState } from "./useActiveIdState";
import { useIsChildOf } from "./useIsChildOf";
import { useFlattenItems } from "./useFlattenItems";

export function useNotActiviedItems() {
  const [activeId] = useActiveIdState()
  const items = useFlattenItems()
  const isChildOf = useIsChildOf()

  const notActivitiedItems = useMemo(() => {
    if (!activeId) {
      return items
    }
    return items.filter(item => item.id !== activeId && !isChildOf(item.id, activeId))
  }, [activeId, isChildOf, items])

  return notActivitiedItems
}