import { Identifier } from "../dnd";
import { useMenuSchemaState } from "./useMenuSchemaState";

export function useItem(id?: Identifier | null) {
  const [menuSchema] = useMenuSchemaState()
  return menuSchema.items.find(item => item.meta.id === id)
}