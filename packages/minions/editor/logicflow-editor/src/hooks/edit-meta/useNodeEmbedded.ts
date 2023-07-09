import { useCallback, useEffect } from "react";
import { useGraph } from "../useGraph";
import { INodeData } from "../../interfaces";
import { Node } from "@antv/x6";
import { useBackup } from "./useBackup";
import { useDispatch } from "../useDispatch";
import { ActionType } from "../../actions";

/**
 * 本函数会导致一个拖入操作撤销两次，暂无解决办法
 */
export function useNodeEmbedded() {
  const graph = useGraph()
  const backup = useBackup()
  const dispatch = useDispatch()

  const handelEmbedded = useCallback((args: { node: Node }) => {
    const { node } = args
    backup()
    const data = node.getData() as INodeData
    const { meta } = data;
    const newMeta = {
      ...meta,
      id: node.id,
      parentId: node.getParentId(),
      x6Node: {
        x: node.getPosition().x,
        y: node.getPosition().y,
        width: node.getSize().width,
        height: node.getSize().height,
      }
    }
    node.setData({ ...data, meta: newMeta })
    dispatch?.({
      type: ActionType.CHANGE_NODE,
      payload: newMeta
    })
  }, [dispatch, backup])

  useEffect(() => {
    graph?.on('node:embedded', handelEmbedded)
    return () => {
      graph?.off('node:embedded', handelEmbedded)
    }
  }, [graph, handelEmbedded])
}