import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { ID } from "shared";
import { RelationType } from "../meta/RelationMeta";
import { relationsState } from "../recoil/atoms";

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
