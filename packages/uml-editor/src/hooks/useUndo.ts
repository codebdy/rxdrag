import { useCallback } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { ID } from "shared";
import { EVENT_UNDO_REDO, triggerCanvasEvent } from "../GraphCanvas/events";
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
  graphLogicsState,
  scriptLogicsState,
  selectedScriptLogicIdState,
  selectedGraphLogicIdState,
  selectedApiIdState,
  codesState,
} from "../recoil/atoms";

export function useUndo(metaId: ID) {
  const [undoList, setUndoList] = useRecoilState(undoListState(metaId));
  const setRedoList = useSetRecoilState(redoListState(metaId));
  const [packages, setPackages] = useRecoilState(packagesState(metaId))
  const [diagrams, setDiagrams] = useRecoilState(diagramsState(metaId));
  const [classes, setClasses] = useRecoilState(classesState(metaId));
  const [relations, setRelations] = useRecoilState(relationsState(metaId));
  const [scriptLogics, setScriptLogics] = useRecoilState(scriptLogicsState(metaId))
  const [graphLogics, setGraphLogics] = useRecoilState(graphLogicsState(metaId))
  const [codes, setCodes] = useRecoilState(codesState(metaId))
  const [x6Nodes, setX6Nodes] = useRecoilState(x6NodesState(metaId));
  const [x6Edges, setX6Edges] = useRecoilState(x6EdgesState(metaId));
  const setChanged = useSetRecoilState(changedState(metaId));

  const [selectedDiagram, setSelectedDiagram] =
    useRecoilState(selectedUmlDiagramState(metaId));

  const [selectedElement, setSelectedElement] =
    useRecoilState(selectedElementState(metaId));
  const [selectedScriptLogic, setSelectedScriptLogic] = useRecoilState(selectedScriptLogicIdState(metaId));
  const [selectedGraphLogic, setSelectedGraphLogic] = useRecoilState(selectedGraphLogicIdState(metaId));
  const [selectedApi, setSelectedApi] = useRecoilState(selectedApiIdState(metaId));
  const undo = useCallback(() => {
    const snapshot = undoList[undoList.length - 1];
    setChanged(true);
    setRedoList((snapshots) => [
      ...snapshots,
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
        selectedApi
      },
    ]);
    setUndoList((snapshots) => snapshots.slice(0, snapshots.length - 1));
    setPackages(snapshot.packages);
    setDiagrams(snapshot.diagrams);
    setClasses(snapshot.classes);
    setRelations(snapshot.relations);
    setScriptLogics(snapshot.scriptLogics);
    setGraphLogics(snapshot.graphLogics);
    setCodes(snapshot.codes);
    setX6Nodes(snapshot.x6Nodes);
    setX6Edges(snapshot.x6Edges);
    setSelectedDiagram(snapshot.selectedDiagram);
    setSelectedElement(snapshot.selectedElement);
    setSelectedScriptLogic(snapshot.selectedScriptLogic);
    setSelectedGraphLogic(snapshot.selectedGraphLogic);
    setSelectedApi(snapshot.selectedApi)
    triggerCanvasEvent({
      name: EVENT_UNDO_REDO,
    });
  }, [undoList, setChanged, setRedoList, setUndoList, setPackages, setDiagrams, setClasses, setRelations, setScriptLogics, setGraphLogics, setCodes, setX6Nodes, setX6Edges, setSelectedDiagram, setSelectedElement, setSelectedScriptLogic, setSelectedGraphLogic, setSelectedApi, packages, diagrams, classes, scriptLogics, graphLogics, codes, relations, x6Nodes, x6Edges, selectedDiagram, selectedElement, selectedScriptLogic, selectedGraphLogic, selectedApi]);
  return undo;
}
