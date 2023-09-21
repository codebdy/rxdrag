import { useCallback } from "react";
import { IMenuSchema, IMenuItemSchema } from "../interfaces/schema";
import { IMenuItem } from "../interfaces";
import { useMenuSchemaState } from "./useMenuSchemaState";
import { ID } from "@rxdrag/shared";

export function useBuildMenuSchema() {
  const [, setMenuSchema] = useMenuSchemaState()
  const processOne = useCallback((item: IMenuItem, menuSchema: IMenuSchema, parentId?: ID) => {
    menuSchema.rootIds.push(item.id)
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

    setMenuSchema(menuSchema)
  }, [setMenuSchema])

  const build = useCallback((items: IMenuItem[]) => {
    const menuSchema: IMenuSchema = {
      rootIds: [],
      items: [],
    }

    for (const item of items) {
      processOne(item, menuSchema)
    }

    return menuSchema
  }, [processOne])

  return build
}