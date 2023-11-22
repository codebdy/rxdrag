import { useCallback } from "react";
import { useSetRecoilState } from "recoil";
import { diagramsState, x6EdgesState, x6NodesState } from "../recoil/atoms";
import { useBackupSnapshot } from "./useBackupSnapshot";
import { ID } from "@rxdrag/shared";

export function useDeleteDiagram(metaId: ID) {
  const setDiagrams = useSetRecoilState(diagramsState(metaId));
  const setNodes = useSetRecoilState(x6NodesState(metaId));
  const setEdges = useSetRecoilState(x6EdgesState(metaId));

  const backupSnapshot = useBackupSnapshot(metaId);

  const deleteDiagram = useCallback(
    (diagramUuid: string) => {
      backupSnapshot();
      setDiagrams((diagrams) =>
        diagrams.filter((diagram) => diagram.uuid !== diagramUuid)
      );
      setNodes((nodes) =>
        nodes.filter((node) => node.diagramUuid !== diagramUuid)
      );

      setEdges((edges) =>
        edges.filter((edge) => edge.diagramUuid !== diagramUuid)
      );
    },
    [backupSnapshot, setDiagrams, setEdges, setNodes]
  );

  return deleteDiagram;
}
