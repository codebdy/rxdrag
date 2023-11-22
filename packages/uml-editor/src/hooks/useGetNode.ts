import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { x6NodesState } from "../recoil/atoms";
import { ID } from "@rxdrag/shared";

export function useGetNode(metaId: ID) {
  const nodes = useRecoilValue(x6NodesState(metaId));

  const getNode = useCallback(
    (uuid: string, diagramUuid: string) => {
      return nodes.find(
        (node) => node.id === uuid && node.diagramUuid === diagramUuid
      );
    },
    [nodes]
  );

  return getNode;
}
