import { useCallback } from "react";
import { useMenuSchemaState } from "./useMenuSchemaState";
import { Identifier } from "../dnd";

export function useGetMenuItemSchema() {
  const [menuSchema] = useMenuSchemaState()

  const getMenuItemSchema = useCallback((id?: Identifier) => {
    return menuSchema.items?.find(item => item.meta.id === id)
  }, [menuSchema.items])

  return getMenuItemSchema
}