import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import {  apisState } from "../recoil/atoms";
import { ID } from "shared";

export function useGetApiByName(metaId: ID) {
  const apis = useRecoilValue(apisState(metaId));

  const getScriptLogicByName = useCallback((name: string) => {
    return apis.find((api) => api.name === name);
  }, [apis]);

  return getScriptLogicByName;
}
