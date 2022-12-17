import { IComponentMaterial } from "core-react/interfaces";
import { isStr } from "core/utils/types";
import { useEffect, useMemo } from "react";
import { useComponentManager } from "./useComponentManager";
import { useDesignComponents } from "./useDesignComponents";
import { useLocalesManager } from "./useLocalesManager";
import { usePreviewComponents } from "./usePreviewComponents";
import { useResourceManager } from "./useResourceManager";

export function useRegisterComponentMaterial(meterial: IComponentMaterial) {
  const resourceManager = useResourceManager()
  const componentManager = useComponentManager()
  const localesManager = useLocalesManager()
  const { registerComponents: registerDesignComponents } = useDesignComponents()
  const { registerComponents: registerPreviewComponents } = usePreviewComponents()
  const resoureNode = useMemo(() => {
    componentManager?.registerComponents(meterial)
    if (meterial.designerLocales) {
      localesManager?.registerComponentLocales(meterial.componentName, meterial.designerLocales)
    }
    if (meterial.resourceLocales) {
      localesManager?.registerResourceLocales(meterial.resourceLocales)
    }

    for (const key of Object.keys(meterial.slots || {})) {
      const subMaterial = meterial.slots?.[key]
      if (subMaterial === true || subMaterial === undefined || isStr(subMaterial)) {
        continue
      }
      componentManager?.registerComponents(subMaterial)
      if (subMaterial.designerLocales) {
        localesManager?.registerComponentLocales(subMaterial.componentName, subMaterial.designerLocales)
      }
      if (subMaterial.resourceLocales) {
        localesManager?.registerResourceLocales(subMaterial.resourceLocales)
      }
      if (subMaterial.resource) {
        resourceManager?.registerResources(subMaterial.resource)
      }
    }

    //这行在最后
    if (meterial.resource) {
      const resources = resourceManager?.registerResources(meterial.resource)
      return resources?.[0]
    }
    return undefined
  }, [componentManager, localesManager, meterial, resourceManager])

  useEffect(() => {
    registerDesignComponents({ [meterial.componentName]: meterial.designer })
    registerPreviewComponents({ [meterial.componentName]: meterial.component })
  }, [meterial.component, meterial.componentName, meterial.designer, registerDesignComponents, registerPreviewComponents])

  return resoureNode
}