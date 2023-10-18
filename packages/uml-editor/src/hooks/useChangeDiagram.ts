import { useCallback } from "react";
import { useSetRecoilState } from "recoil";
import { ID } from "shared";
import { DiagramMeta } from "../meta/DiagramMeta";
import { diagramsState } from "../recoil/atoms";
import { useBackupSnapshot } from "./useBackupSnapshot";

export function useChangeDiagram(metaId: ID) {
  const backupSnapshot = useBackupSnapshot(metaId);
  const setDiagrams = useSetRecoilState(diagramsState(metaId));

  const changeDiagram = useCallback(
    (diagram: DiagramMeta) => {
      backupSnapshot();

      setDiagrams((diagrams) =>
        diagrams.map((dm) => (dm.uuid === diagram.uuid ? diagram : dm))
      );
    },
    [backupSnapshot, setDiagrams]
  );

  return changeDiagram;
}
