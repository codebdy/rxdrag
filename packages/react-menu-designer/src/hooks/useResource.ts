import { UniqueIdentifier } from "@dnd-kit/core";
import { useResources } from "./useResources";
import { useItem } from "./useItem";

export function useResource(id?: UniqueIdentifier | null) {
  const resources = useResources()
  const item = useItem(id)

  return item ? resources.find(resource => resource.isSameSoure(item)) : undefined
}