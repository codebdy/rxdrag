import { useCallback } from "react";
import { useBackup } from "./useBackup";
import { useMarkChange } from "./useMarkChange";
import { useSelectedNode } from "../useSelectedNode";
import { useSelectedEdge } from "../useSelectedEdge";
import { useDispatch } from "../useDispatch";
import { ActionType, RemoveEdgeAction, RemoveNodeAction } from "../../actions";
import { useMetas } from "../useMetas";

export function useRemoveSelected() {
  const backup = useBackup()
  const markeChange = useMarkChange()
  const dispatch = useDispatch()
  const selectedNode = useSelectedNode()
  const selectedEdge = useSelectedEdge()
  const { metas } = useMetas()

  const handleRemove = useCallback(() => {
    if (selectedNode) {
      backup()
      const action: RemoveNodeAction = { type: ActionType.REMOVE_NODE, payload: selectedNode.id }
      dispatch?.(action)
      for(const line of metas?.lines||[]){
        if(line.source.nodeId === selectedNode.id || line.target.nodeId === selectedNode.id){
          const action: RemoveEdgeAction = { type: ActionType.REMOVE_EDGE, payload: line.id }
          dispatch?.(action)
        }
      }
      markeChange()
    } else if (selectedEdge) {
      backup()
      const action: RemoveEdgeAction = { type: ActionType.REMOVE_EDGE, payload: selectedEdge.id }
      dispatch?.(action)
      markeChange()
    }


  }, [backup, dispatch, markeChange, metas?.lines, selectedEdge, selectedNode])

  return handleRemove
}