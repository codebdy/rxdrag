import { Cell } from "@antv/x6";
import { useEffect } from "react";
import { useGetNodeConfig } from "./useGetNodeConfig";
import { useEditorState } from "./useEditorState";

export function useShowCells() {
  const { graph } = useEditorState()
  const getStartNodeConfig = useGetNodeConfig()
  const { metas } = useEditorState()
  useEffect(() => {
    if (graph) {
      const cells: Cell[] = []
      const oldNodes = graph.getNodes()
      const oldCells = graph.getCells()
      for (const reactionNode of metas.reactions) {
        const grahpNode = oldNodes.find(node => node.id === reactionNode.id)
        //更新
        if (grahpNode) {
          grahpNode.setSize(reactionNode.x6Node as any);
          grahpNode.setPosition(reactionNode.x6Node as any);
        } else {//新建
          cells.push(graph.createNode(getStartNodeConfig(reactionNode)))
        }
      }

      //删除不存在的
      for (const cell of oldCells) {
        if (![...metas.reactions, ...metas.invakes].find(el => el.id === cell.id)) {
          cell.remove()
        }
      }

    }
  }, [getStartNodeConfig, graph, metas, metas.invakes, metas.reactions])
}