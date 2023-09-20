import { useCallback } from "react";
import { useMenuSchemaState } from "./useMenuSchemaState";
import { Identifier } from "../dnd";
import { useGetItem } from "./useGetItem";

export function useRemoveItem() {
  const [, setMeunSchema] = useMenuSchemaState()
  const getItem = useGetItem()
  const remove = useCallback((id?: Identifier) => {
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