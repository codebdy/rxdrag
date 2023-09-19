import { useCallback } from "react";
import { Identifier } from "../dnd";
import { useMenuSchemaState } from "./useMenuSchemaState";

export function useToggleCollapse() {
  const [, setMenuSchema] = useMenuSchemaState()
  const toggle = useCallback((id: Identifier) => {
    setMenuSchema(schema => {
      return {
        rootIds: schema.rootIds,
        items: schema.items.map(item => item.meta.id === id ? { ...item, collapsed: !item.collapsed } : item)
      }
    })
  }, [setMenuSchema])

  return toggle
}