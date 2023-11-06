import { useMemo } from "react";
import { useRecentEntity } from "../../../hooks/useRecentEntity";

export function useIsAssociationSelected(id?: string | null) {
  const entity = useRecentEntity()

  const entitySelected = useMemo(() => {
    if (id) {
      return !!entity?.associations?.find(asso => asso.id === id)
    }
    return false;
  }, [entity?.associations, id])

  return entitySelected
}