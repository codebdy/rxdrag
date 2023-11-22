import { useCallback } from 'react';

export function useParseRelationUuid() {
  const parseUuid = useCallback((uuid: string):string => {
    const [, relationUuid] = uuid.split(",");
    return relationUuid
  }, [])

  return parseUuid
}