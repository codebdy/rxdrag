import { useCallback, useEffect } from "react";
import { useGraph } from "../useGraph";
import { ActionType } from "../../actions";
import { INodeData } from "../../interfaces";
import { Node } from "@antv/x6";
import { useDispatch } from "../useDispatch";
import { useBackup } from "./useBackup";

export function useParentChange() {
  const graph = useGraph()
  const dispatch = useDispatch()
  const backup = useBackup()

  const handelParentChange = useCallback(({ node }: { node: Node }) => {
    const { meta } = node.getData() as INodeData
    dispatch?.({
      type: ActionType.CHANGE_NODE,
      payload: {
        ...meta,
        id: node.id,
        x6Node: {
          x: node.getPosition().x,
          y: node.getPosition().y,
          width: node.getSize().width,
          height: node.getSize().height,
        }
      }
    })
  }, [])
  useEffect(() => {
    graph?.on('node:change:parent', handelParentChange)
    return () => {
      graph?.off('node:change:parent', handelParentChange)
    }
  }, [graph])
}