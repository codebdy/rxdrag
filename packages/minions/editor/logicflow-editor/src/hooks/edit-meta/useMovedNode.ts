import { useCallback, useEffect } from "react"
import { INodeData } from "../../interfaces/interfaces"
import { Node } from "@antv/x6";
import { useBackup } from "./useBackup";
import { useMarkChange } from "./useMarkChange";
import { useDispatch } from "../useDispatch";
import { useGraph } from "../useGraph";
import { ActionType } from "../../actions";

export function useMovedNode() {
  const dispatch = useDispatch()
  const graph = useGraph()

  const backup = useBackup()
  const markeChange = useMarkChange()
  const handleNodeMoved = useCallback(({ node }: { x: number, y: number, node: Node, index: number, options: unknown }) => {
    backup()
    //父节点跟随移动
    const parent = node.getParent()
    if (parent && parent.isNode()) {
      const { meta } = parent.getData() as INodeData
      dispatch?.({
        type: ActionType.CHANGE_NODE,
        payload: {
          ...meta,
          id: parent.id,
          x6Node: {
            x: parent.getPosition().x,
            y: parent.getPosition().y,
            width: parent.getSize().width,
            height: parent.getSize().height,
          }
        }
      })
    }

    const { meta } = node.getData() as INodeData
    dispatch?.({
      type: ActionType.CHANGE_NODE,
      payload: {
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
    })

    //子节点跟随移动
    const children = node.getChildren()
    for (const child of children || []) {
      if (child.isNode()) {
        const { meta } = child.getData() as INodeData
        dispatch?.({
          type: ActionType.CHANGE_NODE,
          payload: {
            ...meta,
            id: child.id,
            //解决容器移动时，最新建的节点parentId消失的bug
            parentId: node.id,
            x6Node: {
              x: child.getPosition().x,
              y: child.getPosition().y,
              width: child.getSize().width,
              height: child.getSize().height,
            }
          }
        })
      }
    }

    graph?.select(node.id)
    markeChange()
  }, [backup, dispatch, graph, markeChange])

  useEffect(() => {
    graph?.on('node:moved', handleNodeMoved)

    return () => {
      graph?.off('node:moved', handleNodeMoved)
    }
  }, [graph, handleNodeMoved])
}