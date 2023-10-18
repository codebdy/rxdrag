import { Graph, Node } from "@antv/x6";
import { useCallback, useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  classesState,
  selectedUmlDiagramState,
  selectedElementState,
  x6NodesState,
} from "../recoil/atoms";
import { useBackupSnapshot } from "../hooks/useBackupSnapshot";
import { useCreateClassInnerId } from "../hooks/useCreateClassInnerId";
import { ID } from "@rxdrag/shared";
import { ClassMeta } from "@rxdrag/uml-schema";

export function useNodeAdd(graph: Graph | undefined, metaId: ID) {
  const selectedDiagramUuid = useRecoilValue(selectedUmlDiagramState(metaId));
  const setNodes = useSetRecoilState(x6NodesState(metaId));
  const setEntities = useSetRecoilState(classesState(metaId));
  const backupSnapshot = useBackupSnapshot(metaId);
  const createInnerId = useCreateClassInnerId(metaId);
  const setSelectedElement = useSetRecoilState(selectedElementState(metaId));
  const nodeAdded = useCallback(
    (arg: { node: Node<Node.Properties> }) => {
      const node = arg.node;
      const { isTempForNew, isTempForDrag, packageName, ...rest } =
        arg.node.data;
      const classMeta = rest as ClassMeta;

      if (!selectedDiagramUuid) {
        return;
      }

      if (isTempForNew) {
        setEntities((entities) => [
          ...entities,
          {
            uuid: classMeta.uuid,
            innerId: createInnerId(),
            name: classMeta.name,
            attributes: classMeta.attributes,
            stereoType: classMeta.stereoType,
            root: classMeta.root,
            packageUuid: classMeta.packageUuid,
          },
        ]);
        node.remove({ disconnectEdges: true });
        backupSnapshot();

        setNodes((nodes) => [
          ...nodes,
          {
            //拖放时有Clone动作，ID被改变，所以取Data里面的ID使用
            id: classMeta.uuid || "",
            x: node.getPosition().x,
            y: node.getPosition().y,
            width: node.getSize().width,
            height: node.getSize().height,
            diagramUuid: selectedDiagramUuid,
          },
        ]);
      } else if (isTempForDrag) {
        node.remove({ disconnectEdges: true });
        if (graph?.getCellById(classMeta.uuid)) {
          return;
        }
        setNodes((nodes) => [
          ...nodes,
          {
            //拖放时有Clone动作，ID被改变，所以取Data里面的ID使用
            id: classMeta.uuid || "",
            x: node.getPosition().x,
            y: node.getPosition().y,
            width: node.getSize().width,
            height: node.getSize().height,
            diagramUuid: selectedDiagramUuid,
          },
        ]);
      }

      setSelectedElement(classMeta.uuid);
    },
    [
      backupSnapshot,
      createInnerId,
      graph,
      selectedDiagramUuid,
      setEntities,
      setNodes,
      setSelectedElement,
    ]
  );

  useEffect(() => {
    graph?.on("node:added", nodeAdded);
    return () => {
      graph?.off("node:added", nodeAdded);
    };
  }, [graph, nodeAdded]);
}
