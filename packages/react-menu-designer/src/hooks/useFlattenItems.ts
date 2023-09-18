import { useCallback, useMemo } from "react";
import { IMenuItem } from "../interfaces";
import { IFlattenedItem } from "../interfaces/flattened";
import { Identifier } from "../dnd";
import { useItemsState } from "./useItemsState";

export function useFlattenItems() {
  const [items] = useItemsState()
  const flatten = useCallback((
    items: IMenuItem[],
    parentId: Identifier | null = null,
    depth = 0
  ): IFlattenedItem[] => {
    return items.reduce<IFlattenedItem[]>((acc, item) => {
      return [
        ...acc,
        { ...item, parentId, depth, children: undefined },
        ...flatten(item.children || [], item.id, depth + 1),
      ];
    }, []);
  }, [])

  const flattenItems = useMemo(() => {
    return flatten(items)
  }, [flatten, items])

  return flattenItems
}