import { useResources } from "./useResources";

export function useResource(name?: string) {
  const resources = useResources()
  return resources.find(resource => resource.name === name)
}