import { useCallback } from "react";
import { useMenuSchemaState } from "./useMenuSchemaState";
import { ID } from "@rxdrag/shared";
import { useGetItem } from "./useGetItem";

export function useRemoveItem() {
  const [, setMeunSchema] = useMenuSchemaState()
  const getItem = useGetItem()
  const remove = useCallback((id?: ID) => {
    const item = getItem(id)
    if (!item) {
      return
    }

    setMeunSchema(schema => {
      return {
        rootIds: schema.rootIds.filter(rootId => rootId != id),
        items: schema.items.filter(item => item.meta.id !== id)
          .map(itm => itm.children?.find(child => child === id) ? { ...itm, children: itm.children?.filter(child => child !== id) } : itm)
      }
    })
  }, [getItem, setMeunSchema])

  return remove
}