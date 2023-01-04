import { IComponentMaterial } from "core-react/interfaces";
import { isStr } from "core/utils/types";
import { useCallback } from "react";
import { useComponentManager } from "./useComponentManager";
import { useDesignComponents } from "./useDesignComponents";
import { useLocalesManager } from "./useLocalesManager";
import { usePreviewComponents } from "./usePreviewComponents";
import { useResourceManager } from "./useResourceManager";

export function useRegisterComponentMaterial() {
  const resourceManager = useResourceManager()
  const componentManager = useComponentManager()
  const localesManager = useLocalesManager()
  const { registerComponents: registerDesignComponents } = useDesignComponents()
  const { registerComponents: registerPreviewComponents } = usePreviewComponents()

  const register = useCallback((meterial: IComponentMaterial) => {
    const designers = { [meterial.componentName]: meterial.designer }
    const previews = { [meterial.componentName]: meterial.component }
    componentManager?.registerComponents(meterial)
    if (meterial.designerLocales) {
      localesManager?.registerComponentLocales(meterial.componentName, meterial.designerLocales)
    }
    if (meterial.resource?.resourceLocales) {
      localesManager?.registerResourceLocales(meterial.resource.resourceLocales)
    }

    for (const key of Object.keys(meterial.slots || {})) {
      const slotMaterial = meterial.slots?.[key]
      if (slotMaterial === true || slotMaterial === undefined || isStr(slotMaterial)) {
        continue
      }
      designers[slotMaterial.componentName] = slotMaterial.designer
      previews[slotMaterial.componentName] = slotMaterial.component

      componentManager?.registerComponents(slotMaterial)
      if (slotMaterial.designerLocales) {
        localesManager?.registerComponentLocales(slotMaterial.componentName, slotMaterial.designerLocales)
      }
      if (slotMaterial.resource?.resourceLocales) {
        localesManager?.registerResourceLocales(slotMaterial.resource.resourceLocales)
      }
      if (slotMaterial.resource && !resourceManager?.getResourceByName(slotMaterial.resource.name)) {
        resourceManager?.registerResources(slotMaterial.resource)
      }
    }

    registerDesignComponents(designers)
    registerPreviewComponents(previews)

    if (meterial.resource ) {
      const resources = resourceManager?.registerResources(meterial.resource)
      return (resources?.[0])
    }
  }, [componentManager, localesManager, registerDesignComponents, registerPreviewComponents, resourceManager])

  return register
}