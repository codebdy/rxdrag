import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { ID } from "shared";
import { relationsState } from "../recoil/atoms";

export function useGetRelation(metaId: ID) {
  const relations = useRecoilValue(relationsState(metaId));

  const getRelation = useCallback((uuid: string) => {
    return relations.find((relation) => relation.uuid === uuid);
  }, [relations]);

  return getRelation;
}
