import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { classesState } from "../recoil/atoms";
import { ID } from "@rxdrag/shared";

export function useGetClassByName(metaId: ID) {
  const entites = useRecoilValue(classesState(metaId));

  const getClassByName = useCallback((name: string) => {
    return entites.find((ent) => ent.name === name);
  }, [entites]);

  return getClassByName;
}
