import { useCallback, useEffect } from "react";
import { Graph, Node } from "@antv/x6";
import { useRecoilState, useRecoilValue } from "recoil";
import { selectedUmlDiagramState, selectedElementState } from "../recoil/atoms";
import { useGetDiagramNode } from "../hooks/useGetDiagramNode";
import { CONST_CANVAS_CLICK } from "../consts";
import { ID } from "@rxdrag/shared";

export function useNodeSelect(graph: Graph | undefined, metaId: ID) {
  const [selectedElement, setSelectedElement] =
    useRecoilState(selectedElementState(metaId));
  const selectedDiagram = useRecoilValue(selectedUmlDiagramState(metaId));
  const getDiagramNode = useGetDiagramNode(metaId);

  useEffect(() => {
    if (selectedElement) {
      graph?.cleanSelection();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (graph?.getPlugin('transform') as any)?.onBlankMouseDown();
      const node = graph?.getNodes().find(nd => nd.id === selectedElement);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      node && (graph?.getPlugin('transform') as any)?.onNodeClick({ node: node })

      graph?.select(graph?.getCellById(selectedElement));
    }
  }, [graph, selectedElement]);

  const handleNodeSelected = useCallback(
    (arg: { node: Node<Node.Properties> }) => {
      setSelectedElement(arg.node.id);
    },
    [setSelectedElement]
  );

  const handleNodeUnselected = useCallback(() => {
    if (
      selectedElement &&
      selectedDiagram &&
      getDiagramNode(selectedElement, selectedDiagram)
    ) {
      const clickEnvent = new CustomEvent(CONST_CANVAS_CLICK);
      document.dispatchEvent(clickEnvent);
      setSelectedElement(undefined);
    }
  }, [getDiagramNode, selectedDiagram, selectedElement, setSelectedElement]);

  useEffect(() => {
    graph?.on("node:click", handleNodeSelected);
    graph?.on("node:selected", handleNodeSelected);
    graph?.on("node:unselected", handleNodeUnselected);
    graph?.on("blank:mouseup", handleNodeUnselected);
    return () => {
      graph?.off("node:click", handleNodeSelected);
      graph?.off("node:selected", handleNodeSelected);
      graph?.off("node:unselected", handleNodeUnselected);
      graph?.off("blank:mouseup", handleNodeUnselected);
    };
  }, [graph, handleNodeSelected, handleNodeUnselected]);
}
