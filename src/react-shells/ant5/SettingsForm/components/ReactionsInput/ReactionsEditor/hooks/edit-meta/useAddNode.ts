import { Node } from "@antv/x6";
import { useCallback, useEffect } from "react";
import { ActionType } from "../../actions";
import { INodeData } from "../../interfaces";
import { useEditorState } from "../useEditorState";

export function useAddNode() {
  const { graph, dispatch } = useEditorState()
  const handleNodeAdd = useCallback(({ node }: { node: Node, index: number, options: any }) => {
    const { meta } = node.getData() as INodeData

    dispatch({
      type: ActionType.ADD_NODE,
      payload: {
        ...meta,
        id: node.id,
        x6Node: {
          id: node.id,
          x: node.getPosition().x,
          y: node.getPosition().y,
          width: node.getSize().width,
          height: node.getSize().height,
        }
      }
    })
  }, [dispatch])

  useEffect(() => {
    graph?.on('node:added', handleNodeAdd)

    return () => {
      graph?.off('node:added', handleNodeAdd)
    }
  }, [graph, handleNodeAdd])
}