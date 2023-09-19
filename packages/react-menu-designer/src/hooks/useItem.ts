import { Identifier } from "../dnd/types";
import { useMenuSchemaState } from "./useMenuSchemaState";

export function useItem(id?: Identifier | null) {
  const [items] = useMenuSchemaState()
  return items.find(item => item.id === id)
}