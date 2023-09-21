import { ID } from "@rxdrag/shared";
import { IMenuItemMeta } from "../interfaces";
import { useResources } from "./useResources";
import { useCallback } from "react";

export function useGetResource() {
  const resources = useResources()
  const getResource = useCallback((item?: ID | IMenuItemMeta) => {
    if (typeof (item) == 'string') {
      return resources.find(resource => resource.id === item)
    }
    return resources.find(resource => resource.selector?.(item))
  }, [resources])
  return getResource
}