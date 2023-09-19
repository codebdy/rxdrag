import { useCallback } from "react";
import { DropIndicator, Identifier } from "../dnd"
import { DropTarget, PostionType } from "../types";
import { useGetItem } from "./useGetItem";
import { useGetFlattenItem } from "./useGetFlattenItem";

export function useGetDropTarget(indentationWidth: number, draggingId?:Identifier) {
  const getItem = useGetItem()
  const getFlattenItem = useGetFlattenItem(draggingId)

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

    if (belowAtItem && belowAtFlattenItem) {
      //作为子元素
      if ((belowAtFlattenItem.depth + 1) * indentationWidth < (indicator.delta?.x || 0)) {
        target.targetId = belowAtItem.meta.id;
        target.position = PostionType.in
        return target
      } else if ((belowAtFlattenItem.depth) * indentationWidth < (indicator.delta?.x || 0)) {
        target.targetId = belowAtItem.meta.id;
        target.position = PostionType.after
        return target
        //后面判断
      } else{
        //
      }
    }

  }, [getFlattenItem, getItem, indentationWidth])

  return getDropTarget
}