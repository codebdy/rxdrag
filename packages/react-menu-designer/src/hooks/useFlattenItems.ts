import { useCallback, useMemo } from "react";
import { IFlattenedItem } from "../interfaces/flattened";
import { Identifier } from "../dnd";
import { useMenuSchemaState } from "./useMenuSchemaState";
import { useGetMenuItemSchema } from "./useGetMenuItemSchema";
import { useActiveIdState } from "./useActiveIdState";

export function useFlattenItems() {
  const [menuSchema] = useMenuSchemaState();
  const getItem = useGetMenuItemSchema();
  const [activeId] = useActiveIdState()

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
          activied: activeId === id,
        }
        return [
          ...acc,
          flattenedItem,
          ...flatten(item?.children || [], depth + 1),
        ];
      } else {
        console.error("Can find item:", id)
        return acc
      }
    }, []);
  }, [activeId, getItem])

  const flattenItems = useMemo(() => {
    return flatten(menuSchema.rootIds)
  }, [flatten, menuSchema])

  return flattenItems
}