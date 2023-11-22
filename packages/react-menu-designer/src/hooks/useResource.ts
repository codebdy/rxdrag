import { ID } from "@rxdrag/shared";
import { IMenuItemMeta } from "../interfaces";
import { useGetResource } from "./useGetResource";

export function useResource(item?: ID | IMenuItemMeta) {
  const getResource = useGetResource()
  return getResource(item)
}