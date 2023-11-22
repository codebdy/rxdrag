import { useCallback } from "react";
import { IMenuItem } from "../interfaces";
import { useMenuSchemaState } from "./useMenuSchemaState";
import { useGetItem } from "./useGetItem";
import { ID } from "@rxdrag/shared";

export function useExtractMenuItems() {
  const [menuSchema] = useMenuSchemaState()
  const getItem = useGetItem()

  const extractOne = useCallback((id: ID) => {
    const item = getItem(id)
    if (item) {
      const newItem: IMenuItem = { ...item?.meta, children: [] }
      for (const child of item?.children || []) {
        const childItem = extractOne(child)
        if (childItem) {
          newItem.children?.push(childItem)
        }
      }
      return newItem
    }

  }, [getItem])

  const extract = useCallback(() => {
    const menuItems: IMenuItem[] = []
    for (const id of menuSchema.rootIds) {
      const item = extractOne(id)
      if (item) {
        menuItems.push(item)
      }
    }
    return menuItems
  }, [extractOne, menuSchema.rootIds])

  return extract
}