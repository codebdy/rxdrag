import { ID } from "shared";
import { useRecoilValue } from 'recoil';
import { graphLogicsState } from "../recoil/atoms";
import { useCallback } from 'react';

export function useIsGraphLogic(metaId: ID) {
  const logics = useRecoilValue(graphLogicsState(metaId))

  const isGraphLogic = useCallback((uuid: string) => {
    return logics.find(d => d.uuid === uuid)
  }, [logics])

  return isGraphLogic
}