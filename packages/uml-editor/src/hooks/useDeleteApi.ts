import { useCallback } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { apisState, selectedApiIdState } from "../recoil/atoms";
import { useBackupSnapshot } from "./useBackupSnapshot";
import { ID } from "shared";

export function useDeleteApi(metaId: ID) {
  const setApis = useSetRecoilState(apisState(metaId));
  const [selectedApiId, setSelectedApiId] = useRecoilState(selectedApiIdState(metaId));

  const backupSnapshot = useBackupSnapshot(metaId);

  const deleteApi = useCallback(
    (apiUuid: string) => {
      backupSnapshot();
      setApis((apis) =>
        apis.filter((api) => api.uuid !== apiUuid)
      );

      if (selectedApiId === apiUuid) {
        setSelectedApiId(undefined)
      }
    },
    [backupSnapshot, selectedApiId, setApis, setSelectedApiId]
  );

  return deleteApi;
}
