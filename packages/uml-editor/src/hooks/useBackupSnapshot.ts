import { useCallback } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  changedState,
  diagramsState,
  classesState,
  redoListState,
  relationsState,
  selectedUmlDiagramState,
  selectedElementState,
  undoListState,
  x6EdgesState,
  x6NodesState,
  packagesState,
} from "../recoil/atoms";
import { ID } from "@rxdrag/shared";

export function useBackupSnapshot(metaId: ID) {
  const diagrams = useRecoilValue(diagramsState(metaId));
  const classes = useRecoilValue(classesState(metaId));
  const relations = useRecoilValue(relationsState(metaId));
  const packages = useRecoilValue(packagesState(metaId))
  const x6Nodes = useRecoilValue(x6NodesState(metaId));
  const x6Edges = useRecoilValue(x6EdgesState(metaId));
  const selectedDiagram = useRecoilValue(selectedUmlDiagramState(metaId));
  const selectedElement = useRecoilValue(selectedElementState(metaId));
  const setChanged = useSetRecoilState(changedState(metaId));

  const setUndoList = useSetRecoilState(undoListState(metaId));
  const setRedoList = useSetRecoilState(redoListState(metaId));
  const backupSnapshot = useCallback(() => {
    setChanged(true);
    setUndoList((undoList) => [
      ...undoList,
      {
        packages,
        diagrams,
        classes,
        relations,
        x6Nodes,
        x6Edges,
        selectedDiagram,
        selectedElement,
      },
    ]);
    setRedoList([]);
  }, [setChanged, setUndoList, setRedoList, packages, diagrams, classes, relations, x6Nodes, x6Edges, selectedDiagram, selectedElement]);

  return backupSnapshot;
}
