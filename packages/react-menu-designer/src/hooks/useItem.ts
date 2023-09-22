import { ID } from "@rxdrag/shared";
import { useMenuSchemaState } from "./useMenuSchemaState";

export function useItem(id?: ID | null) {
  const [menuSchema] = useMenuSchemaState()
  return menuSchema.items.find(item => item.meta.id === id)
}