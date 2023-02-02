import { useCallback, useEffect } from "react"
import { INodeData } from "../../interfaces"
import { useEditorStore } from "../useEditorStore"
import { Node } from "@antv/x6";
import { ActionType } from "../../actions";
import { useBackup } from "./useBackup";
import { useMarkChange } from "./useMarkChange";

export function useMovedNode() {
  const { graph, dispatch } = useEditorStore()
  const backup = useBackup()
  const markeChange = useMarkChange()
  const handleNodeMoved = useCallback(({ x, y, node }: { x: number, y: number, node: Node, index: number, options: any }) => {
    backup()
    const { meta } = node.getData() as INodeData
    dispatch({
      type: ActionType.CHANGE_NODE,
      payload: {
        ...meta,
        id: node.id,
        x6Node: {
          x: node.getPosition().x,
          y: node.getPosition().y,
          width: node.getSize().width,
          height: node.getSize().height,
        }
      }
    })
    graph?.select(node.id)
    markeChange()
  }, [backup, dispatch, graph, markeChange])

  useEffect(() => {
    graph?.on('node:moved', handleNodeMoved)

    return () => {
      graph?.off('node:moved', handleNodeMoved)
    }
  }, [graph, handleNodeMoved])
}