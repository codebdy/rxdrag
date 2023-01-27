import { useCallback, useEffect } from "react"
import { INodeData } from "../../interfaces"
import { useEditorState } from "../useEditorState"
import { Node } from "@antv/x6";
import { ActionType } from "../../actions";
import { useBackup } from "./useBackup";

export function useMovedNode() {
  const { graph, dispatch } = useEditorState()
  const backup = useBackup()
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
  }, [backup, dispatch, graph])

  useEffect(() => {
    graph?.on('node:moved', handleNodeMoved)

    return () => {
      graph?.off('node:moved', handleNodeMoved)
    }
  }, [graph, handleNodeMoved])
}