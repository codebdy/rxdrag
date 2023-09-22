import { useCallback } from "react";
import { ID } from "@rxdrag/shared";
import { IConfig } from "../interfaces";
import { useMenuSchemaState } from "./useMenuSchemaState";

export function useUpdateConfig(id?: ID) {
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