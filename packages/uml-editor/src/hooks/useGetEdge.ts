import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { x6EdgesState } from "../recoil/atoms";
import { ID } from "@rxdrag/shared";

export function useGetEdge(metaId: ID) {
  const edges = useRecoilValue(x6EdgesState(metaId));
  const getEdge = useCallback(
    (id: string, diagramUuid: string) => {
      return edges.find(
        (edage) => edage.id === id && edage.diagramUuid === diagramUuid
      );
    },
    [edges]
  );

  return getEdge;
}
