import { ID } from "@rxdrag/shared";
import { useFlattenItems } from "./useFlattenItems";
import { useCallback } from "react";

export function useGetFlattenItem(draggingId?: ID) {
  const items = useFlattenItems(draggingId)
  const getItem = useCallback((id?: ID | null) => {
    return items.find(item => item.meta.id === id)
  }, [items])
  return getItem
}