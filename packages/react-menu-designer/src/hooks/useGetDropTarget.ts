import { useCallback } from "react";
import { DropIndicator } from "../dnd"
import { DropTarget, PostionType } from "../types";
import { useGetItem } from "./useGetItem";
import { useGetFlattenItem } from "./useGetFlattenItem";
import { useGetParentByDepth } from "./useGetParentByDepth";
import { useGetResource } from "./useGetResource";
import { ID } from "@rxdrag/shared";

export function useGetDropTarget(indentationWidth: number, draggingId?: ID) {
  const getItem = useGetItem()
  const getFlattenItem = useGetFlattenItem(draggingId)
  const getParentByDepth = useGetParentByDepth()
  const getResource = useGetResource()

  const getDropTarget = useCallback((indicator?: DropIndicator) => {
    const target: DropTarget = {
      targetId: null,
      position: PostionType.in
    }
    //如果没有参照节点，插入容器最开始
    if (!indicator?.belowAtId) {
      return target
    }

    const belowAtItem = getItem(indicator.belowAtId)
    const belowAtFlattenItem = getFlattenItem(indicator.belowAtId)
    const deltaDepth = Math.ceil((indicator.delta?.x || 0) / indentationWidth)

    if (belowAtItem && belowAtFlattenItem) {
      const resource = getResource(belowAtItem.meta)
      //作为子元素
      if ((belowAtFlattenItem.depth + 1) < deltaDepth && !resource?.childless) {
        target.targetId = belowAtItem.meta.id;
        target.position = PostionType.in
        return target
        //作为兄弟元素
      } else if (belowAtFlattenItem.depth < deltaDepth) {
        target.targetId = belowAtItem.meta.id;
        target.position = PostionType.after
        return target
        //父祖辈的兄弟判断
      } else {
        const parentId = getParentByDepth(indicator.belowAtId, deltaDepth - 1)
        if (parentId) {
          target.targetId = parentId;
          target.position = PostionType.after
          return target
        }
      }
    }

  }, [getFlattenItem, getItem, getParentByDepth, getResource, indentationWidth])

  return getDropTarget
}