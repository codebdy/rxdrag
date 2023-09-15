import { useResources } from "./useResources";
import { useCallback } from "react";
import { IFlattenedItem } from "../interfaces/flattened";

export function useGetResource() {
  const resources = useResources()
  const getResource = useCallback((item?: IFlattenedItem) => {
    return item ? resources.find(resource => resource.isSameSoure(item)) : undefined
  }, [resources])
  return getResource
}