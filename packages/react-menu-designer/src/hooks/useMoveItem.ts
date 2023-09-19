import { useCallback } from "react";
import { useMenuSchemaState } from "./useMenuSchemaState";
import { DropTarget, PostionType } from "../types";
import { IMenuItemSchema, IMenuSchema } from "../interfaces/schema";

export function useMoveItem() {
  const [menuSchema, setMenuSchema] = useMenuSchemaState()

  const move = useCallback((itemSchema: IMenuItemSchema, target: DropTarget) => {
    if (target.targetId === null && target.position === PostionType.in) {
      const newSchema: IMenuSchema = {
        rootIds: [itemSchema.meta.id, ...menuSchema.rootIds.filter(id => id !== itemSchema.meta.id)],
        items: [...menuSchema.items.filter(item => item.meta.id !== itemSchema.meta.id), itemSchema]
      }

      setMenuSchema(newSchema)
    }
  }, [menuSchema.items, menuSchema.rootIds, setMenuSchema])

  return move
}