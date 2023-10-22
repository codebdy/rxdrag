import { useCallback } from "react";
import { useEntities } from "./useEntities";

export function useGetEntity() {
  const entities = useEntities()
  const getEntity = useCallback((id?: string) => {
    if (!id) {
      return
    }
    return entities?.find(ent => ent.uuid === id)
  }, [entities])

  return getEntity
}