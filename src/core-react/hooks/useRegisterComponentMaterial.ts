import { IComponentMaterial } from "core-react/interfaces";
import { isStr } from "core/utils/types";
import { useCallback } from "react";
import { useComponentManager } from "./useComponentManager";
import { useDesignComponentsParams } from "./useDesignComponentsParams";
import { useLocalesManager } from "./useLocalesManager";
import { usePreviewComponents } from "./usePreviewComponents";
import { useResourceManager } from "./useResourceManager";

export function useRegisterComponentMaterial() {
  const resourceManager = useResourceManager()
  const componentManager = useComponentManager()
  const localesManager = useLocalesManager()
  const { registerComponents: registerDesignComponents, registerTools } = useDesignComponentsParams()
  const { registerComponents: registerPreviewComponents } = usePreviewComponents()

  const register = useCallback((meterial: IComponentMaterial, isSlot?: boolean) => {
    const designers = { [meterial.componentName]: meterial.designer }
    const previews = { [meterial.componentName]: meterial.component }
    const tools = meterial.tools
    componentManager?.registerComponents(meterial)
    if (meterial.designerLocales) {
      localesManager?.registerComponentLocales(meterial.componentName, meterial.designerLocales)
    }
    if (meterial.resource?.resourceLocales) {
      localesManager?.registerResourceLocales(meterial.resource.resourceLocales)
    }

    if (meterial.toolsLocales) {
      localesManager?.registerToolsLocales(meterial.toolsLocales)
    }

    for (const key of Object.keys(meterial.slots || {})) {
      const slotMaterial = meterial.slots?.[key]
      if (slotMaterial === true || slotMaterial === undefined || isStr(slotMaterial)) {
        continue
      }
      register(slotMaterial, true)
    }

    registerDesignComponents(designers)
    registerPreviewComponents(previews)
    tools && registerTools(tools)

    if (meterial.resource && !resourceManager?.getResourceByName(meterial.resource.name) && !isSlot) {
      const resources = resourceManager?.registerResources(meterial.resource)
      return (resources?.[0])
    }
  }, [componentManager, localesManager, registerDesignComponents, registerPreviewComponents, registerTools, resourceManager])

  return register
}