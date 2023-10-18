import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import {  scriptLogicsState } from "../recoil/atoms";
import { ID } from "shared";

export function useGetScriptLogicByName(metaId: ID) {
  const scriptLogics = useRecoilValue(scriptLogicsState(metaId));

  const getScriptLogicByName = useCallback((name: string) => {
    return scriptLogics.find((logic) => logic.name === name);
  }, [scriptLogics]);

  return getScriptLogicByName;
}
