import { Identifier } from "../dnd";
import { IMenuItemMeta } from "../interfaces";
import { useGetResource } from "./useGetResource";

export function useResource(item?: Identifier | IMenuItemMeta) {
  const getResource = useGetResource()
  return getResource(item)
}