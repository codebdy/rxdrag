import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { relationsState } from "../recoil/atoms";
import { RelationType } from "@rxdrag/uml-schema";
import { ID } from "@rxdrag/shared";

export function useGetTargetRelations(metaId: ID) {
  const relations = useRecoilValue(relationsState(metaId));

  const getTargetRelations = useCallback((entityUuid: string,)=>{
    return relations.filter(
      (relation) =>
        relation.targetId === entityUuid &&
        relation.relationType !== RelationType.INHERIT
    );
  }, [relations])


  return getTargetRelations;
}
