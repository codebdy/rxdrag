import { useCallback } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
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
} from "../recoil/atoms";
import { ID } from "@rxdrag/shared";

export function useUndo(metaId: ID) {
  const [undoList, setUndoList] = useRecoilState(undoListState(metaId));
  const setRedoList = useSetRecoilState(redoListState(metaId));
  const [packages, setPackages] = useRecoilState(packagesState(metaId))
  const [diagrams, setDiagrams] = useRecoilState(diagramsState(metaId));
  const [classes, setClasses] = useRecoilState(classesState(metaId));
  const [relations, setRelations] = useRecoilState(relationsState(metaId));
  const [x6Nodes, setX6Nodes] = useRecoilState(x6NodesState(metaId));
  const [x6Edges, setX6Edges] = useRecoilState(x6EdgesState(metaId));
  const setChanged = useSetRecoilState(changedState(metaId));

  const [selectedDiagram, setSelectedDiagram] =
    useRecoilState(selectedUmlDiagramState(metaId));

  const [selectedElement, setSelectedElement] =
    useRecoilState(selectedElementState(metaId));

  const undo = useCallback(() => {
    const snapshot = undoList[undoList.length - 1];
    setChanged(true);
    setRedoList((snapshots) => [
      ...snapshots,
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
    setUndoList((snapshots) => snapshots.slice(0, snapshots.length - 1));
    setPackages(snapshot.packages);
    setDiagrams(snapshot.diagrams);
    setClasses(snapshot.classes);
    setRelations(snapshot.relations);
    setX6Nodes(snapshot.x6Nodes);
    setX6Edges(snapshot.x6Edges);
    setSelectedDiagram(snapshot.selectedDiagram);
    setSelectedElement(snapshot.selectedElement);
    triggerCanvasEvent({
      name: EVENT_UNDO_REDO,
    });
  }, [undoList, setChanged, setRedoList, setUndoList, setPackages, setDiagrams, setClasses, setRelations, setX6Nodes, setX6Edges, setSelectedDiagram, setSelectedElement, packages, diagrams, classes, relations, x6Nodes, x6Edges, selectedDiagram, selectedElement]);
  return undo;
}
