import { useCallback } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { codesState, selectedCodeIdState } from "../recoil/atoms";
import { useBackupSnapshot } from "./useBackupSnapshot";
import { ID } from "shared";

export function useDeleteCodes(metaId: ID) {
  const setCodes = useSetRecoilState(codesState(metaId));
  const [selectedCodeId, setSelectedCodeId] = useRecoilState(selectedCodeIdState(metaId));

  const backupSnapshot = useBackupSnapshot(metaId);

  const deleteScriptLogic = useCallback(
    (logicScriptUuid: string) => {
      backupSnapshot();
      setCodes((codes) =>
        codes.filter((or) => or.uuid !== logicScriptUuid)
      );

      if (selectedCodeId === logicScriptUuid) {
        setSelectedCodeId(undefined)
      }
    },
    [backupSnapshot, selectedCodeId, setCodes, setSelectedCodeId]
  );

  return deleteScriptLogic;
}

