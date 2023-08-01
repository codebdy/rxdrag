import { Node } from "@antv/x6";
import { useCallback, useEffect } from "react";
import { INodeData } from "../../interfaces/interfaces";
import { useDispatch } from "../useDispatch";
import { useGraph } from "../useGraph";
import { useBackup } from "./useBackup";
import { useMarkChange } from "./useMarkChange";
import { ActionType } from "../../actions";

export function useAddNode() {
  const graph = useGraph()
  const dispatch = useDispatch()

  const markChange = useMarkChange()
  const backup = useBackup()
  const handleNodeAdd = useCallback(({ node }: { node: Node, index: number, options: unknown }) => {
    const { meta } = node.getData() as INodeData
    backup()
    const newData = {
      ...meta,
      id: node.id,
      x6Node: {
        x: node.getPosition().x,
        y: node.getPosition().y,
        width: node.getSize().width,
        height: node.getSize().height,
      }
    }
    node.setData(newData)
    graph?.select(node.id)
    dispatch?.({
      type: ActionType.ADD_NODE,
      payload: newData
    })
    markChange()
  }, [backup, dispatch, graph, markChange])

  useEffect(() => {
    graph?.on('node:added', handleNodeAdd)

    return () => {
      graph?.off('node:added', handleNodeAdd)
    }
  }, [graph, handleNodeAdd])
}