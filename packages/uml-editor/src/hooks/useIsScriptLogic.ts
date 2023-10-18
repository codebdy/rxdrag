import { ID } from "shared";
import { useRecoilValue } from 'recoil';
import { scriptLogicsState } from "../recoil/atoms";
import { useCallback } from 'react';

export function useIsScriptLogic(metaId: ID) {
  const logics = useRecoilValue(scriptLogicsState(metaId))

  const isScriptLogic = useCallback((uuid: string) => {
    return logics.find(d => d.uuid === uuid)
  }, [logics])

  return isScriptLogic
}