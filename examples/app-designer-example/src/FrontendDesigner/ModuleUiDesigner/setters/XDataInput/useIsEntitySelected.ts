import { useMemo } from "react";
import { useEntities } from "../../../hooks/useEntities";


export function useIsEntitySelected(id?: string | null) {
  const entities = useEntities()

  const entitySelected = useMemo(() => {
    if (id) {
      return !!entities?.find(ent => ent.uuid === id)
    }
    return false;
  }, [entities, id])

  return entitySelected
}