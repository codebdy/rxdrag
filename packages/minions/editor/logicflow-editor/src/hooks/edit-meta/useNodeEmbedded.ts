import { useCallback, useEffect } from "react";
import { useGraph } from "../useGraph";
import { INodeData } from "../../interfaces";
import { Node } from "@antv/x6";
import { useBackup } from "./useBackup";
import { useDispatch } from "../useDispatch";
import { ActionType, EmbedNodeAction } from "../../actions";
import { useMarkChange } from "./useMarkChange";

/**
 * 本函数会导致一个拖入操作撤销两次，暂无解决办法
 */
export function useNodeEmbedded() {
  const graph = useGraph()
  const backup = useBackup()
  const dispatch = useDispatch()
  const markChange = useMarkChange()

  const handelEmbedded = useCallback((args: { node: Node }) => {
    const { node } = args
    backup()
    const data = node.getData() as INodeData
    const { meta } = data;
    const parentId = node.getParentId()
    const newMeta = {
      ...meta,
      id: node.id,
      parentId,
      x6Node: {
        x: node.getPosition().x,
        y: node.getPosition().y,
        width: node.getSize().width,
        height: node.getSize().height,
      }
    }
    node.setData({ ...data, meta: newMeta })

    if (parentId) {
      const action: EmbedNodeAction = {
        type: ActionType.EMBED_NODE,
        parentId: parentId,
        payload: newMeta
      }
      dispatch?.(action)
      markChange()
    } else {
      console.error("embed no parentId")
    }

  }, [dispatch, backup, markChange])

  useEffect(() => {
    graph?.on('node:embedded', handelEmbedded)
    return () => {
      graph?.off('node:embedded', handelEmbedded)
    }
  }, [graph, handelEmbedded])
}