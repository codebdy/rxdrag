import { ID } from "shared";
import { useCallback } from 'react';

export function useParseRelationUuid(metaId: ID) {
  const parseUuid = useCallback((uuid: string):string => {
    const [, relationUuid] = uuid.split(",");
    return relationUuid
  }, [])

  return parseUuid
}