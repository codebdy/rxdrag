import { Edge } from "@antv/x6"
import { useCallback, useEffect } from "react"
import { IInvokeMeta } from "runner/reaction/interfaces/metas"
import { ActionType } from "../../actions"
import { useEditorState } from "../useEditorState"

export function useEditEdge() {
  const { graph, dispatch } = useEditorState()
  const handleNodeAdd = useCallback(({ isNew, edge }: { isNew: boolean, edge: Edge }) => {
    const newData: IInvokeMeta = {
      id: edge.id,
      source: {
        nodeId: (edge.getSource() as any).cell,
        port: (edge.getSource() as any).port,
      },
      target: {
        nodeId: (edge.getTarget() as any).cell,
        port: (edge.getTarget() as any).port,
      },
    }

    dispatch({
      type: isNew ? ActionType.ADD_EDGE : ActionType.CHANGE_EDGE,
      payload: newData
    })
    
  }, [dispatch])

  useEffect(() => {
    graph?.on('edge:connected', handleNodeAdd)

    return () => {
      graph?.off('edge:connected', handleNodeAdd)
    }
  }, [graph, handleNodeAdd])
}