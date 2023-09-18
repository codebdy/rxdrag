import { useCallback } from "react"
import { Identifier } from "../dnd"
import { useShowingItems } from "./useShowingItems"

export function useGetChildren() {
  const items = useShowingItems()
  const getChildItems = useCallback((id?: Identifier) => {
    return items.filter(item => item.parentId === id && id)
  }, [items])

  return getChildItems
}