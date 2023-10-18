import { ID } from "shared";
import { useRecoilValue } from 'recoil';
import { apisState } from "../recoil/atoms";
import { useCallback } from 'react';

export function useIsApi(metaId: ID) {
  const apis = useRecoilValue(apisState(metaId))

  const isApi = useCallback((uuid: string) => {
    return apis.find(d => d.uuid === uuid)
  }, [apis])

  return isApi
}