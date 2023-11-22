import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { relationsState } from "../recoil/atoms";
import { ID } from "@rxdrag/shared";
import { RelationType } from "@rxdrag/uml-schema";

export function useGetFirstParentIds(metaId: ID) {
  const relations = useRecoilValue(relationsState(metaId));
  const getParentId = useCallback(
    (uuid: string) => {
      const uuids: string[] = [];
      for(const relation of relations){
        if(relation.sourceId === uuid &&
          relation.relationType === RelationType.INHERIT){
            uuids.push(relation.targetId)
          }
      }
      return uuids
    },
    [relations]
  );

  return getParentId;
}
