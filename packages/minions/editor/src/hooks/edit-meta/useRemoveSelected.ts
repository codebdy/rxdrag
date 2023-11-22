import { useCallback } from "react";
import { useBackup } from "./useBackup";
import { useMarkChange } from "./useMarkChange";
import { useSelectedNode } from "../useSelectedNode";
import { useSelectedEdge } from "../useSelectedEdge";
import { useDispatch } from "../useDispatch";
import { ActionType, RemoveEdgeAction, RemoveNodeAction } from "../../actions";
import { useMetas } from "../useMetas";
import { ILogicMetas } from "../../interfaces";
import { ILineDefine, NodeType } from "@rxdrag/minions-schema";

export function useRemoveSelected() {
  const backup = useBackup()
  const markChange = useMarkChange()
  const dispatch = useDispatch()
  const selectedNode = useSelectedNode()
  const selectedEdge = useSelectedEdge()
  const { metas } = useMetas()

  const handleRemove = useCallback(() => {
    if (selectedNode) {
      backup()
      //删除相关连线
      for (const line of getAllLines(metas)) {
        if (line.source.nodeId === selectedNode.id || line.target.nodeId === selectedNode.id) {
          const action: RemoveEdgeAction = { type: ActionType.REMOVE_EDGE, payload: line.id }
          dispatch?.(action)
        }
      }
      //再删除节点
      const action: RemoveNodeAction = { type: ActionType.REMOVE_NODE, payload: selectedNode.id }
      dispatch?.(action)
      markChange()
    } else if (selectedEdge) {
      backup()
      const action: RemoveEdgeAction = { type: ActionType.REMOVE_EDGE, payload: selectedEdge.id }
      dispatch?.(action)
      markChange()
    }


  }, [backup, dispatch, markChange, metas, selectedEdge, selectedNode])

  return handleRemove
}

function getAllLines(logicMetas?: ILogicMetas) {
  if (!logicMetas) {
    return []
  }
  const metas: ILineDefine[] = [...logicMetas.lines]
  for (const nodeMeta of logicMetas.nodes) {
    if (nodeMeta.type === NodeType.EmbeddedFlow) {
      metas.push(...nodeMeta.children?.lines || [])
    }
  }

  return metas
}