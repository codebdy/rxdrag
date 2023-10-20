import { useCallback } from "react";
import { useRecoilState } from "recoil";
import { selectedElementState } from "../recoil/atoms";
import { useAttribute } from "./useAttribute";
import { useDeleteAttribute } from "./useDeleteAttribute";
import { useDeleteClass } from "./useDeleteClass";
import { useDeleteRelation } from "./useDeleteRelation";
import { useClass } from "./useClass";
import { useRelation } from "./useRelation";
import { ID } from "@rxdrag/shared";

/**
 * 本方法不需要备份状态
 */
export function useDeleteSelectedElement(metaId: ID) {
  const [selectedElement, setSelectedElement] = useRecoilState(
    selectedElementState(metaId)
  );
  const cls = useClass(selectedElement || "", metaId);
  const deleteClass = useDeleteClass(metaId);
  const relation = useRelation(selectedElement || "", metaId);
  const deleteRelation = useDeleteRelation(metaId);

  const { attribute } = useAttribute(selectedElement || "", metaId);
  const deletedAttribute = useDeleteAttribute(metaId);

  const deleteSelectedElement = useCallback(() => {
    if (cls) {
      deleteClass(cls.uuid);
    }
    if (relation) {
      deleteRelation(relation.uuid);
    }

    if (attribute) {
      deletedAttribute(attribute.uuid);
    }

    setSelectedElement(undefined);
  }, [cls, relation, attribute, setSelectedElement, deleteClass, deleteRelation, deletedAttribute]);

  return deleteSelectedElement;
}
