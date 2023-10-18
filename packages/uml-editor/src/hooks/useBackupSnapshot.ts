import { useCallback } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { ID } from "shared";
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
  selectedScriptLogicIdState,
  selectedGraphLogicIdState,
  scriptLogicsState,
  graphLogicsState,
  selectedApiIdState,
  codesState,
} from "../recoil/atoms";

export function useBackupSnapshot(metaId: ID) {
  const diagrams = useRecoilValue(diagramsState(metaId));
  const classes = useRecoilValue(classesState(metaId));
  const relations = useRecoilValue(relationsState(metaId));
  const packages = useRecoilValue(packagesState(metaId))
  const scriptLogics = useRecoilValue(scriptLogicsState(metaId))
  const graphLogics = useRecoilValue(graphLogicsState(metaId))
  const codes = useRecoilValue(codesState(metaId))
  const x6Nodes = useRecoilValue(x6NodesState(metaId));
  const x6Edges = useRecoilValue(x6EdgesState(metaId));
  const selectedDiagram = useRecoilValue(selectedUmlDiagramState(metaId));
  const selectedElement = useRecoilValue(selectedElementState(metaId));
  const selectedScriptLogic = useRecoilValue(selectedScriptLogicIdState(metaId));
  const selectedGraphLogic = useRecoilValue(selectedGraphLogicIdState(metaId));
  const selectedApi = useRecoilValue(selectedApiIdState(metaId));
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
        scriptLogics,
        graphLogics,
        codes,
        relations,
        x6Nodes,
        x6Edges,
        selectedDiagram,
        selectedElement,
        selectedScriptLogic,
        selectedGraphLogic,
        selectedApi,
      },
    ]);
    setRedoList([]);
  }, [setChanged, setUndoList, setRedoList, packages, diagrams, classes, scriptLogics, graphLogics, codes, relations, x6Nodes, x6Edges, selectedDiagram, selectedElement, selectedScriptLogic, selectedGraphLogic, selectedApi]);

  return backupSnapshot;
}
