import { useCallback } from "react";
import { ID } from "@rxdrag/shared";
import { useMenuSchemaState } from "./useMenuSchemaState";

export function useToggleCollapse() {
  const [, setMenuSchema] = useMenuSchemaState()
  const toggle = useCallback((id: ID) => {
    setMenuSchema(schema => {
      return {
        rootIds: schema.rootIds,
        items: schema.items.map(item => item.meta.id === id ? { ...item, collapsed: !item.collapsed } : item)
      }
    })
  }, [setMenuSchema])

  return toggle
}