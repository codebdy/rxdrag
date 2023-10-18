import { useRecoilValue } from "recoil";
import { ID } from "shared";
import { relationsState, selectedElementState } from "../recoil/atoms";

export function useSelectedRelation(metaId: ID) {
  const selectedElement = useRecoilValue(selectedElementState(metaId));
  const relations = useRecoilValue(relationsState(metaId));

  return relations.find((relation) => relation.uuid === selectedElement);
}
