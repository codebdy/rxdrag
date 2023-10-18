import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { ID } from "shared";
import { classesState } from "../recoil/atoms";

export function useGetClassByName(metaId: ID) {
  const entites = useRecoilValue(classesState(metaId));

  const getClassByName = useCallback((name: string) => {
    return entites.find((ent) => ent.name === name);
  }, [entites]);

  return getClassByName;
}
