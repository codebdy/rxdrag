import { useCallback } from "react";
import { useSetRecoilState } from "recoil";
import { relationsState } from "../recoil/atoms";
import { useBackupSnapshot } from "./useBackupSnapshot";
import { ID } from "@rxdrag/shared";
import { RelationMeta } from "@rxdrag/uml-schema";

export function useChangeRelation(metaId: ID) {
  const backupSnapshot = useBackupSnapshot(metaId);
  const setRelations = useSetRecoilState(relationsState(metaId));

  const changeRelation = useCallback(
    (relation: RelationMeta) => {
      backupSnapshot();

      setRelations((relations) =>
        relations.map((rel) => (rel.uuid === relation.uuid ? relation : rel))
      );
    },
    [backupSnapshot, setRelations]
  );

  return changeRelation;
}
