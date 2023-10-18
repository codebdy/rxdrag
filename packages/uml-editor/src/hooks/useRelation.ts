import { useRecoilValue } from "recoil";
import { ID } from "shared";
import { relationsState } from "../recoil/atoms";

export function useRelation(uuid: string, metaId: ID) {
  const relations = useRecoilValue(relationsState(metaId));

  return relations.find((relation) => relation.uuid === uuid);
}
