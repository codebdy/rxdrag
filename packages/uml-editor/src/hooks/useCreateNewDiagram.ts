import { useTranslate } from "@rxdrag/react-locales";
import { useGetDiagramByName } from "./useGetDiagramByName";
import { useCallback } from "react";
import { ID, createId } from "@rxdrag/shared";

export function useCreateNewDiagram(metaId: ID) {
  const getDiagramByName = useGetDiagramByName(metaId);
  const  t  = useTranslate();

  const getNewDiagramName = useCallback(() => {
    const prefix = t("NewDiagram");
    let index = 1;
    while (getDiagramByName(prefix + index)) {
      index++;
    }

    return prefix + index;
  }, [getDiagramByName, t]);

  const createNewDiagram = useCallback((packageUuid: string) => {
    const newDiagram = {
      uuid: createId(),
      name: getNewDiagramName(),
      packageUuid,
      nodes: [],
      edges: [],
    };
    return newDiagram;
  }, [getNewDiagramName]);

  return createNewDiagram;
}
