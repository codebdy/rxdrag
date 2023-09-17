import { useResources } from "./useResources";
import { useCallback } from "react";

export function useGetResource() {
  const resources = useResources()
  const getResource = useCallback((name?: string) => {
    return resources.find(resource => resource.name === name)
  }, [resources])
  return getResource
}