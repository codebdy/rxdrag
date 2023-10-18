import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { diagramsState } from "../recoil/atoms";
import { ID } from "@rxdrag/shared";

export function useGetDiagramByName(metaId: ID) {
  const diagrams = useRecoilValue(diagramsState(metaId));

  const getDiagramByName = useCallback((name: string) => {
    return diagrams.find((diagram) => diagram.name === name);
  }, [diagrams]);

  return getDiagramByName;
}
