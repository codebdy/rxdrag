import { message } from "antd";
import { useCallback } from "react";
import { useSetRecoilState } from "recoil";
import { useBackupSnapshot } from "./useBackupSnapshot";
import { MetaContent } from "../interfaces";
import { classesState, relationsState, diagramsState, x6NodesState, x6EdgesState, packagesState } from "../recoil/atoms";
import { getTheFiles } from "@rxdrag/shared";

export function useImportModelJson(metaId: string) {
  const backupSnapshot = useBackupSnapshot(metaId);
  const setClasses = useSetRecoilState(classesState(metaId));
  const setRelations = useSetRecoilState(relationsState(metaId));
  const setDiagrams = useSetRecoilState(diagramsState(metaId));
  const setX6Nodes = useSetRecoilState(x6NodesState(metaId));
  const setX6Edges = useSetRecoilState(x6EdgesState(metaId));
  const setPackages = useSetRecoilState(packagesState(metaId))

  const doImport = useCallback(() => {
    getTheFiles(".json").then((fileHandles) => {
      fileHandles?.[0]?.getFile().then((file: any) => {
        file.text().then((fileData: any) => {
          try {
            backupSnapshot();
            const meta: MetaContent = JSON.parse(fileData);
            setPackages(meta?.packages || []);
            setClasses(meta?.classes || []);
            setRelations(meta?.relations || []);
            setDiagrams(meta?.diagrams || []);
            setX6Nodes(meta?.x6Nodes || []);
            setX6Edges(meta?.x6Edges || []);

          } catch (error: any) {
            console.error(error);
            message.error("file illegal");
          }
        });
      });
    });
  }, [backupSnapshot, setPackages, setClasses, setRelations, setDiagrams, setX6Nodes, setX6Edges]);

  return doImport
}