import { useCallback } from "react";
import { useMenuSchemaState } from "./useMenuSchemaState";
import { useGetItem } from "./useGetItem";

export function useGetBeforeBrother() {
  const [menuSchema] = useMenuSchemaState()
  const getItem = useGetItem()

  const getBefore = useCallback((id: string) => {
    const item = getItem(id)
    const brothers = item?.parentId ? getItem(item?.parentId)?.children : menuSchema.rootIds
    if (brothers) {
      const index = brothers.indexOf(id) - 1
      if (index > -1) {
        return brothers[index]
      }
    }
    return null
  }, [getItem, menuSchema.rootIds])

  return getBefore
}