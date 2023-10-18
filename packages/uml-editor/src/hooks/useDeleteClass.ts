import { useCallback } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  classesState,
  relationsState,
  x6EdgesState,
  x6NodesState,
} from "../recoil/atoms";
import { useBackupSnapshot } from "./useBackupSnapshot";
import { ID } from "@rxdrag/shared";

export function useDeleteClass(metaId: ID) {
  const setEntites = useSetRecoilState(classesState(metaId));
  const [relations, setRelations] = useRecoilState(relationsState(metaId));
  const setNodes = useSetRecoilState(x6NodesState(metaId));
  const setEdges = useSetRecoilState(x6EdgesState(metaId));

  const backupSnapshot = useBackupSnapshot(metaId);

  const deleteClasses = useCallback(
    (classUuid: string) => {
      backupSnapshot();
      setEntites((clses) =>
        clses.filter((entity) => entity.uuid !== classUuid)
      );
      const relationIds = relations
        .filter(
          (relation) =>
            relation.sourceId === classUuid || relation.targetId === classUuid
        )
        .map((relation) => relation.uuid);
      setRelations((relations) =>
        relations.filter((relation) => !relationIds.find(uuid=>relation.uuid === uuid))
      );

      setNodes((nodes) => nodes.filter((node) => node.id !== classUuid));

      setEdges((edges) => edges.filter((edge) => !(edge.id in relationIds)));
    },
    [backupSnapshot, relations, setEdges, setEntites, setNodes, setRelations]
  );

  return deleteClasses;
}
