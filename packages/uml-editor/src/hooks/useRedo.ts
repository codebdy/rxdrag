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
  selectedGraphLogicIdState,
  selectedScriptLogicIdState,
  codesState,
} from "../recoil/atoms";

export function useRedo(metaId: ID) {
  const setUndoList = useSetRecoilState(undoListState(metaId));
  const [redoList, setRedoList] = useRecoilState(redoListState(metaId));
  const [packages, setPackages] = useRecoilState(packagesState(metaId))
  const [diagrams, setDiagrams] = useRecoilState(diagramsState(metaId));
  const [classes, setClasses] = useRecoilState(classesState(metaId));
  const [scriptLogics, setScriptLogics] = useRecoilState(scriptLogicsState(metaId))
  const [graphLogics, setGraphLogics] = useRecoilState(graphLogicsState(metaId))
  const [codes, setCodes] = useRecoilState(codesState(metaId))
  const [relations, setRelations] = useRecoilState(relationsState(metaId));
  const [x6Nodes, setX6Nodes] = useRecoilState(x6NodesState(metaId));
  const [x6Edges, setX6Edges] = useRecoilState(x6EdgesState(metaId));
  const setChanged = useSetRecoilState(changedState(metaId));

  const [selectedDiagram, setSelectedDiagram] = useRecoilState(
    selectedUmlDiagramState(metaId)
  );

  const [selectedElement, setSelectedElement] = useRecoilState(
    selectedElementState(metaId)
  );
  const [selectedScriptLogic, setSelectedScriptLogic] = useRecoilState(selectedScriptLogicIdState(metaId));
  const [selectedGraphLogic, setSelectedGraphLogic] = useRecoilState(selectedGraphLogicIdState(metaId));

  const undo = useCallback(() => {
    const snapshot = redoList[redoList.length - 1];
    setChanged(true);
    setUndoList((snapshots) => [
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
        selectedGraphLogic
      },
    ]);
    setRedoList((snapshots) => snapshots.slice(0, snapshots.length - 1));
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
    triggerCanvasEvent({
      name: EVENT_UNDO_REDO,
    });
  }, [redoList, setChanged, setUndoList, setRedoList, setPackages, setDiagrams, setClasses, setRelations, setScriptLogics, setGraphLogics, setCodes, setX6Nodes, setX6Edges, setSelectedDiagram, setSelectedElement, setSelectedScriptLogic, setSelectedGraphLogic, packages, diagrams, classes, scriptLogics, graphLogics, codes, relations, x6Nodes, x6Edges, selectedDiagram, selectedElement, selectedScriptLogic, selectedGraphLogic]);
  return undo;
}
