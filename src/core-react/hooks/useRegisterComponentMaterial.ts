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
      const slotMaterial = meterial.slots?.[key]
      if (slotMaterial === true || slotMaterial === undefined || isStr(slotMaterial)) {
        continue
      }

      componentManager?.registerComponents(slotMaterial)
      if (slotMaterial.designerLocales) {
        localesManager?.registerComponentLocales(slotMaterial.componentName, slotMaterial.designerLocales)
      }
      if (slotMaterial.resourceLocales) {
        localesManager?.registerResourceLocales(slotMaterial.resourceLocales)
      }
      if (slotMaterial.resource) {
        resourceManager?.registerResources(slotMaterial.resource)
      }
    }

    //这行在最后
    if (meterial.resource) {
      const resources = resourceManager?.registerResources(meterial.resource)
      return resources?.[0]
    }
    return undefined
  }, [componentManager, localesManager, meterial, resourceManager])

  const [designers, previews] = useMemo(() => {
    const designs = { [meterial.componentName]: meterial.designer }
    const prevws = { [meterial.componentName]: meterial.component }
    for (const key of Object.keys(meterial.slots || {})) {
      const slotMaterial = meterial.slots?.[key]
      if (slotMaterial === true || slotMaterial === undefined || isStr(slotMaterial)) {
        continue
      }
      designs[slotMaterial.componentName] = slotMaterial.designer
      prevws[slotMaterial.componentName] = slotMaterial.component
    }
    return [designs, prevws]
  }, [meterial.component, meterial.componentName, meterial.designer, meterial.slots])


  useEffect(() => {
    registerDesignComponents(designers)
    registerPreviewComponents(previews)
  }, [designers, previews, registerDesignComponents, registerPreviewComponents])

  return resoureNode
}