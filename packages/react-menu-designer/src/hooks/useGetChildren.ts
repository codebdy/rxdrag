import { useCallback } from "react"
import { Identifier } from "../dnd"
import { useNotActiviedItems } from "./useNotActiviedItems"

export function useGetChildren() {
  const items = useNotActiviedItems()
  const getChildItems = useCallback((id?: Identifier) => {
    return items.filter(item => item.parentId === id && id)
  }, [items])

  return getChildItems
}