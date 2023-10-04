/* eslint-disable @typescript-eslint/no-explicit-any */
import { Edge } from "@antv/x6"
import { useCallback, useEffect } from "react"
import { useDispatch } from "../useDispatch"
import { useGraph } from "../useGraph"
import { useBackup } from "./useBackup"
import { useMarkChange } from "./useMarkChange"
import { ActionType, AddEdgeAction, ChangeEdgeAction } from "../../actions"
import { ILineDefine } from "@rxdrag/minions-schema"
import { createId } from "@rxdrag/shared"

export function useEditEdge() {
  const dispatch = useDispatch()
  const graph = useGraph()
  const backup = useBackup()
  const markChange = useMarkChange()
  const handleEdgeAdd = useCallback(({ isNew, edge }: { isNew: boolean, edge: Edge }) => {
    backup()
    const newData: ILineDefine = {
      id: isNew ? createId() : edge.id,
      source: {
        nodeId: (edge.getSource() as any).cell,
        portId: (edge.getSource() as any).port,
      },
      target: {
        nodeId: (edge.getTarget() as any).cell,
        portId: (edge.getTarget() as any).port,
      },
    }
    const action: AddEdgeAction | ChangeEdgeAction = {
      type: isNew ? ActionType.ADD_EDGE : ActionType.CHANGE_EDGE,
      parentId: edge.getParentId(),
      payload: newData
    }
    //graph?.select(edge.id)
    dispatch?.(action)
    edge.setData({ meta: newData })
    edge.setAttrs({
      line: {
        stroke: "#5e76c3"
      }
    })
    markChange()
  }, [backup, dispatch, markChange])

  useEffect(() => {
    graph?.on('edge:connected', handleEdgeAdd)

    return () => {
      graph?.off('edge:connected', handleEdgeAdd)
    }
  }, [graph, handleEdgeAdd])
}