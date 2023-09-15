import { UniqueIdentifier } from "@dnd-kit/core";
import { useResources } from "./useResources";
import { useCallback } from "react";
import { useGetItem } from "./useGetItem";

export function useGetResource() {
  const resources = useResources()
  const getItem = useGetItem()
  const getResource = useCallback((id?: UniqueIdentifier | null) => {
    const item = getItem(id)
    return item ? resources.find(resource => resource.isSameSoure(item)) : undefined
  }, [getItem, resources])
  return getResource
}