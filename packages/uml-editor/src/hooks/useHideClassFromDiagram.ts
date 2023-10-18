import { useCallback } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { selectedUmlDiagramState, x6NodesState } from "../recoil/atoms";
import { useBackupSnapshot } from "./useBackupSnapshot";
import { ID } from "@rxdrag/shared";

export function useHideClassFromDiagram(metaId: ID) {
  const selectedDiagramUuid = useRecoilValue(selectedUmlDiagramState(metaId))
  const setNodes = useSetRecoilState(x6NodesState(metaId));
  const backupSnapshot = useBackupSnapshot(metaId);

  const hideClass = useCallback((classUuid: string) => {
    if (!selectedDiagramUuid) {
      return;
    }
    backupSnapshot();
    setNodes((nodes) => nodes.filter(
      (node) => {
        return !(node.id === classUuid && node.diagramUuid === selectedDiagramUuid)
      }
    ));
  }, [backupSnapshot, selectedDiagramUuid, setNodes]);

  return hideClass
}