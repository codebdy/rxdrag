import { Edge } from "@antv/x6"
import { useCallback, useEffect } from "react"
import { IInvokeMeta } from "runner/reaction/interfaces/metas"
import { ActionType } from "../../actions"
import { useEditorStore } from "../useEditorStore"
import { useBackup } from "./useBackup"
import { useMarkChange } from "./useMarkChange"

export function useEditEdge() {
  const { graph, dispatch } = useEditorStore()
  const backup = useBackup()
  const markeChange = useMarkChange()
  const handleNodeAdd = useCallback(({ isNew, edge }: { isNew: boolean, edge: Edge }) => {
    backup()
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
    graph?.select(edge.id)
    dispatch({
      type: isNew ? ActionType.ADD_EDGE : ActionType.CHANGE_EDGE,
      payload: newData
    })
    markeChange()
  }, [backup, dispatch, graph, markeChange])

  useEffect(() => {
    graph?.on('edge:connected', handleNodeAdd)

    return () => {
      graph?.off('edge:connected', handleNodeAdd)
    }
  }, [graph, handleNodeAdd])
}