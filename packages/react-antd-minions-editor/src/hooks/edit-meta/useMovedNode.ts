import { useCallback, useEffect } from "react"
import { INodeData } from "../../interfaces/interfaces"
import { Node } from "@antv/x6";
import { ActionType } from "../../actions";
import { useBackup } from "./useBackup";
import { useMarkChange } from "./useMarkChange";
import { useDispatch } from "../useDispatch";
import { useGraph } from "../useGraph";

export function useMovedNode() {
  const dispatch = useDispatch()
  const graph = useGraph()

  const backup = useBackup()
  const markeChange = useMarkChange()
  const handleNodeMoved = useCallback(({ node }: { x: number, y: number, node: Node, index: number, options: unknown }) => {
    backup()
    const { meta } = node.getData() as INodeData
    dispatch?.({
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