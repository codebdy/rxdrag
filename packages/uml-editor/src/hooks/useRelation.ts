import { useRecoilValue } from "recoil";
import { relationsState } from "../recoil/atoms";
import { ID } from "@rxdrag/shared";

export function useRelation(uuid: string, metaId: ID) {
  const relations = useRecoilValue(relationsState(metaId));

  return relations.find((relation) => relation.uuid === uuid);
}
