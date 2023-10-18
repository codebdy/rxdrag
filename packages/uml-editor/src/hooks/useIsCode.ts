import { ID } from "shared";
import { useRecoilValue } from 'recoil';
import { codesState } from "../recoil/atoms";
import { useCallback } from 'react';

export function useIsCode(metaId: ID) {
  const codes = useRecoilValue(codesState(metaId))

  const isCode = useCallback((uuid: string) => {
    return codes.find(d => d.uuid === uuid)
  }, [codes])

  return isCode
}