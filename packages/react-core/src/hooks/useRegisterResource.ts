import { IResource } from "@rxdrag/core";
import { useCallback } from "react";
import { useLocalesManager } from "./useLocalesManager";
import { useResourceManager } from "./useResourceManager";

export function useRegisterResource() {
  const resourceManager = useResourceManager()
  const localesManager = useLocalesManager()

  const register = useCallback((resource: IResource) => {

    if (resource.resourceLocales) {
      localesManager?.registerResourceLocales(resource.resourceLocales)
    }


    if (resource) {
      const resources = resourceManager?.registerResources(resource)
      return (resources?.[0])
    }
  }, [localesManager, resourceManager])

  return register
}