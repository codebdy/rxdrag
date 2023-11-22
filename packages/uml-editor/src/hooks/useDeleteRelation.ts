import { useCallback } from "react";
import { useSetRecoilState } from "recoil";
import { relationsState, x6EdgesState } from "../recoil/atoms";
import { useBackupSnapshot } from "./useBackupSnapshot";
import { ID } from "@rxdrag/shared";

export function useDeleteRelation(metaId: ID) {
  const setRelation = useSetRecoilState(relationsState(metaId));
  const setEdges = useSetRecoilState(x6EdgesState(metaId));

  const backupSnapshot = useBackupSnapshot(metaId);

  const deleteRelation = useCallback(
    (uuid: string) => {
      backupSnapshot();
      setRelation((relations) =>
        relations.filter((relation) => relation.uuid !== uuid)
      );
      setEdges((edges) => edges.filter((edge) => edge.id !== uuid));
    },
    [backupSnapshot, setEdges, setRelation]
  );

  return deleteRelation;
}
