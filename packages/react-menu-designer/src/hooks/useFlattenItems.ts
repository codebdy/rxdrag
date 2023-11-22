import { useCallback, useMemo } from "react";
import { IFlattenedItem } from "../interfaces/flattened";
import { useMenuSchemaState } from "./useMenuSchemaState";
import { useGetMenuItemSchema } from "./useGetMenuItemSchema";
import { ID } from "@rxdrag/shared";

export function useFlattenItems(draggingId?: ID) {
  const [menuSchema] = useMenuSchemaState();
  const getItem = useGetMenuItemSchema();

  const flatten = useCallback((
    itemIds: ID[],
    depth = 0
  ): IFlattenedItem[] => {

    return itemIds.reduce<IFlattenedItem[]>((acc, id) => {
      const item = getItem(id)
      if (item) {
        const flattenedItem: IFlattenedItem = {
          depth,
          meta: item.meta,
          children: item.children,
          collapsed: item.collapsed,
        }
        let children: IFlattenedItem[] = []
        if (draggingId !== item.meta.id) {
          if (!item.collapsed) {
            children = flatten(item?.children || [], depth + 1)
          } else {
            children = flatten(item?.children?.filter(child => child === draggingId) || [], depth + 1)
          }
        }
        return [
          ...acc,
          flattenedItem,
          ...children,
        ];
      } else {
        //console.error("Can find item:", id)
        return acc
      }
    }, []);
  }, [draggingId, getItem])

  const flattenItems = useMemo(() => {
    const items = flatten(menuSchema.rootIds)
    return items
  }, [flatten, menuSchema])

  return flattenItems
}