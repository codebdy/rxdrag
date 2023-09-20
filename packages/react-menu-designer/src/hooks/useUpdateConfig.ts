import { useCallback } from "react";
import { Identifier } from "../dnd";
import { IConfig } from "../interfaces";
import { useMenuSchemaState } from "./useMenuSchemaState";

export function useUpdateConfig(id?: Identifier) {
  const [, setMenuSchema] = useMenuSchemaState()
  const update = useCallback((config: IConfig) => {
    setMenuSchema(schema => {
      return {
        ...schema,
        items: schema.items.map(item => item.meta.id === id ? ({ ...item, meta: { ...item.meta, config } }) : item)
      }
    })
  }, [id, setMenuSchema])

  return update
}