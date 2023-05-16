/* eslint-disable @typescript-eslint/no-explicit-any */
import { Edge } from "@antv/x6"
import { ILineDefine } from "@rxdrag/schema"
import { useCallback, useEffect } from "react"
import { ActionType } from "../../actions"
import { useDispatch } from "../useDispatch"
import { useGraph } from "../useGraph"
import { useBackup } from "./useBackup"
import { useMarkChange } from "./useMarkChange"

export function useEditEdge() {
  const dispatch = useDispatch()
  const graph = useGraph()
  const backup = useBackup()
  const markeChange = useMarkChange()
  const handleNodeAdd = useCallback(({ isNew, edge }: { isNew: boolean, edge: Edge }) => {
    backup()
    const newData: ILineDefine = {
      id: edge.id,
      source: {
        nodeId: (edge.getSource() as any).cell,
        portId: (edge.getSource() as any).port,
      },
      target: {
        nodeId: (edge.getTarget() as any).cell,
        portId: (edge.getTarget() as any).port,
      },
    }
    //graph?.select(edge.id)
    dispatch?.({
      type: isNew ? ActionType.ADD_EDGE : ActionType.CHANGE_EDGE,
      payload: newData
    })
    markeChange()
  }, [backup, dispatch, markeChange])

  useEffect(() => {
    graph?.on('edge:connected', handleNodeAdd)

    return () => {
      graph?.off('edge:connected', handleNodeAdd)
    }
  }, [graph, handleNodeAdd])
}