import { useCallback } from "react";
import { useGetItem } from "./useGetItem";
import { Identifier } from "../dnd";
import { useNotActiviedItems } from "./useNotActiviedItems";

export function useGetBelowBrother() {
  const items = useNotActiviedItems()
  const getItem = useGetItem()
  const getBelowBrother = useCallback((id: Identifier) => {
    const item = getItem(id)
    if (item) {
      let below = false
      for (let i = 0; i < items.length; i++) {
        if (below) {
          if (items[i].parentId === item.parentId) {
            return items[i]
          }
        }
        if (items[i].id === id) {
          below = true
        }
      }
    }
  }, [getItem, items])

  return getBelowBrother;
}