import { IComponentMaterial } from "../interfaces";
import { useCallback } from "react";
import { useComponentManager } from "./useComponentManager";
import { useDesignComponentsParams } from "./useDesignComponentsParams";
import { useLocalesManager } from "./useLocalesManager";
import { useResourceManager } from "./useResourceManager";
import { isStr } from "@rxdrag/shared"
//import { usePreviewComponents } from "@rxdrag/react-runner";
import { ReactComponent } from "@rxdrag/react-shared";
import { IComponentConfig } from "@rxdrag/core";

export function useRegisterComponentMaterial() {
  const resourceManager = useResourceManager()
  const componentManager = useComponentManager()
  const localesManager = useLocalesManager()
  const { registerComponents: registerDesignComponents, registerTools } = useDesignComponentsParams()
  //const { registerComponents: registerPreviewComponents } = usePreviewComponents()

  const register = useCallback((material: IComponentMaterial, isSlot?: boolean) => {
    const designers = { [material.componentName]: material.designer }
    //const previews = { [material.componentName]: material.component }
    const setters = material.setters
    componentManager?.registerComponents(material)
    if (material.designerLocales) {
      localesManager?.registerComponentLocales(material.componentName, material.designerLocales)
    }
    if (material.resource?.resourceLocales) {
      localesManager?.registerResourceLocales(material.resource.resourceLocales)
    }

    if (material.toolsLocales) {
      localesManager?.registerSetterLocales(material.toolsLocales)
    }

    for (const key of Object.keys(material.slots || {})) {
      const slotMaterial = material.slots?.[key]
      if (slotMaterial === true || slotMaterial === undefined || isStr(slotMaterial)) {
        continue
      }
      register(slotMaterial as IComponentConfig<ReactComponent>, true)
    }

    registerDesignComponents(designers)
    //registerPreviewComponents(previews)
    setters && registerTools(setters)

    if (material.resource && !resourceManager?.getResourceByName(material.resource.name) && !isSlot) {
      const resources = resourceManager?.registerResources(material.resource)
      return (resources?.[0])
    }
    return undefined
  }, [componentManager, localesManager, registerDesignComponents, registerTools, resourceManager])

  return register
}