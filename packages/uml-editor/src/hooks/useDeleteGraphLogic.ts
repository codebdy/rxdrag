import { useCallback } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { graphLogicsState, selectedGraphLogicIdState } from "../recoil/atoms";
import { useBackupSnapshot } from "./useBackupSnapshot";
import { ID } from "shared";

export function useDeleteGraphLogic(metaId: ID) {
  const setLogicGraphs = useSetRecoilState(graphLogicsState(metaId));
  const [selectedLogicId, setSelectedLogicId] = useRecoilState(selectedGraphLogicIdState(metaId));

  const backupSnapshot = useBackupSnapshot(metaId);

  const deleteOrchestration = useCallback(
    (logicGraphUuid: string) => {
      backupSnapshot();
      setLogicGraphs((orches) =>
        orches.filter((or) => or.uuid !== logicGraphUuid)
      );

      if (selectedLogicId === logicGraphUuid) {
        setSelectedLogicId(undefined)
      }
    },
    [backupSnapshot, selectedLogicId, setLogicGraphs, setSelectedLogicId]
  );

  return deleteOrchestration;
}
