import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import {  graphLogicsState } from "../recoil/atoms";
import { ID } from "shared";

export function useGetGraphLogicByName(metaId: ID) {
  const graphLogics = useRecoilValue(graphLogicsState(metaId));

  const getGraphLogicByName = useCallback((name: string) => {
    return graphLogics.find((logic) => logic.name === name);
  }, [graphLogics]);

  return getGraphLogicByName;
}
