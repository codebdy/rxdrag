import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { x6NodesState } from "../recoil/atoms";
import { ID } from "@rxdrag/shared";

export function useGetDiagramNode(metaId: ID) {
  const nodes = useRecoilValue(x6NodesState(metaId));

  const getNode = useCallback(
    (uuid: string, diagramId: string) => {
      return nodes.find(
        (node) => node.id === uuid && node.diagramUuid === diagramId
      );
    },
    [nodes]
  );

  return getNode;
}
