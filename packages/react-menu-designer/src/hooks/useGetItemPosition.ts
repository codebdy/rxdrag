import { useCallback } from "react";
import { ID } from "@rxdrag/shared";
import { DropTarget, PostionType } from "../types";
import { useGetItem } from "./useGetItem";
import { useGetBeforeBrother } from "./useGetBeforeBrother";

export function useGetItemPosition() {
  const getItem = useGetItem()
  const getBeforeBrother = useGetBeforeBrother()

  const getItemPosition = useCallback((id: ID) => {
    const target: DropTarget = {
      targetId: null,
      position: PostionType.in
    }

    const item = getItem(id)

    if (!item) {
      return
    }

    const beforeBrother = getBeforeBrother(id)

    if (beforeBrother) {
      target.targetId = beforeBrother;
      target.position = PostionType.after;
    } else {
      if (item.parentId) {
        target.targetId = item.parentId;
        target.position = PostionType.in;
      }
    }

    return target
  }, [getBeforeBrother, getItem])


  return getItemPosition
}