import { useRecoilValue } from "recoil";
import { relationsState, selectedElementState } from "../recoil/atoms";
import { ID } from "@rxdrag/shared";

export function useSelectedRelation(metaId: ID) {
  const selectedElement = useRecoilValue(selectedElementState(metaId));
  const relations = useRecoilValue(relationsState(metaId));

  return relations.find((relation) => relation.uuid === selectedElement);
}
