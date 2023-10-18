import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { relationsState } from "../recoil/atoms";
import { ID } from "@rxdrag/shared";
import { RelationMeta, RelationType } from "@rxdrag/uml-schema";

export interface Association {
  name: string;
  relation: RelationMeta;
}

export function useGetClassAssociations(metaId: ID) {
  const relations = useRecoilValue(relationsState(metaId));

  const getClassAssociations = useCallback(
    (classUuid: string) => {
      const associations: Association[] = [];
      for (const relation of relations) {
        if (
          relation.relationType === RelationType.INHERIT 
        ) {
          continue;
        }
        if (relation.sourceId === classUuid) {
          associations.push({ name: relation.roleOfTarget || "", relation });
        } else if (relation.targetId === classUuid) {
          associations.push({ name: relation.roleOfSource || "", relation });
        }
      }
      return associations;
    },
    [relations]
  );

  return getClassAssociations;
}
