import { useCallback, useMemo } from "react";
import { IFlattenedItem } from "../interfaces/flattened";
import { Identifier } from "../dnd";
import { useMenuSchemaState } from "./useMenuSchemaState";
import { useGetMenuItemSchema } from "./useGetMenuItemSchema";

export function useFlattenItems(draggingId?: Identifier) {
  const [menuSchema] = useMenuSchemaState();
  const getItem = useGetMenuItemSchema();

  const flatten = useCallback((
    itemIds: Identifier[],
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
        const children = (draggingId !== item.meta.id && !item.collapsed) ? flatten(item?.children || [], depth + 1) : []
        return [
          ...acc,
          flattenedItem,
          ...children,
        ];
      } else {
        console.error("Can find item:", id)
        return acc
      }
    }, []);
  }, [draggingId, getItem])

  const flattenItems = useMemo(() => {
    return flatten(menuSchema.rootIds)
  }, [flatten, menuSchema])

  return flattenItems
}