import { useRecoilValue } from "recoil";
import { RelationType } from "@rxdrag/uml-schema";
import { relationsState } from "../recoil/atoms";
import { ID } from "@rxdrag/shared";

export function useFirstChildrenIds(id: string, metaId: ID) {
  const relations = useRecoilValue(relationsState(metaId));

  const children: string[] = [];
  for (const relation of relations) {
    if (
      relation.targetId === id &&
      relation.relationType === RelationType.INHERIT
    ) {
      children.push(relation.sourceId);
    }
  }
  return children;
}
