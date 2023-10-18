import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { relationsState } from "../recoil/atoms";
import { RelationType } from "@rxdrag/uml-schema";
import { ID } from "@rxdrag/shared";

export function useGetSourceRelations(metaId: ID) {
  const relations = useRecoilValue(relationsState(metaId));

  const getRelations = useCallback((entityUuid: string,)=>{
    return relations.filter(
      (relation) =>
        relation.sourceId === entityUuid &&
        relation.relationType !== RelationType.INHERIT
    );
  }, [relations])

  return getRelations;
}
