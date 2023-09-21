import { useCallback } from "react";
import { useMenuSchemaState } from "./useMenuSchemaState";
import { ID } from "@rxdrag/shared";

export function useGetMenuItemSchema() {
  const [menuSchema] = useMenuSchemaState()

  const getMenuItemSchema = useCallback((id?: ID) => {
    return menuSchema.items?.find(item => item.meta.id === id)
  }, [menuSchema.items])

  return getMenuItemSchema
}