import { useCallback } from "react";
import { IMenuSchema, IMenuItemSchema } from "../interfaces/schema";
import { IMenuItem } from "../interfaces";
import { useMenuSchemaState } from "./useMenuSchemaState";
import { ID } from "@rxdrag/shared";

export function useBuildMenuSchema() {
  const [, setMenuSchema] = useMenuSchemaState()
  const processOne = useCallback((item: IMenuItem, menuSchema: IMenuSchema, parentId?: ID) => {
    const meta: IMenuItem = JSON.parse(JSON.stringify(item))
    delete (meta.children)
    const menuItemSchema: IMenuItemSchema = {
      parentId,
      collapsed: item.children ? true : undefined,
      meta,
      children: item.children?.map(child => child.id)
    }

    menuSchema.items.push(menuItemSchema)

    for (const child of item.children || []) {
      processOne(child, menuSchema, item.id)
    }

  }, [])

  const build = useCallback((items: IMenuItem[]) => {
    const menuSchema: IMenuSchema = {
      rootIds: [],
      items: [],
    }

    for (const item of items) {
      menuSchema.rootIds.push(item.id)
      processOne(item, menuSchema)
    }
    setMenuSchema(menuSchema)
  }, [processOne, setMenuSchema])

  return build
}