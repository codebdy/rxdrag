import { IComponentMaterial } from "core-react/interfaces";
import { IResourceNode } from "core/interfaces";
import { isStr } from "core/utils/types";
import { useEffect, useState } from "react";
import { useComponentManager } from "./useComponentManager";
import { useDesignComponents } from "./useDesignComponents";
import { useLocalesManager } from "./useLocalesManager";
import { usePreviewComponents } from "./usePreviewComponents";
import { useResourceManager } from "./useResourceManager";

export function useRegisterComponentMaterial(meterial: IComponentMaterial) {
  const[resourceNode, setResourceNode] = useState<IResourceNode>()
  const resourceManager = useResourceManager()
  const componentManager = useComponentManager()
  const localesManager = useLocalesManager()
  const { registerComponents: registerDesignComponents } = useDesignComponents()
  const { registerComponents: registerPreviewComponents } = usePreviewComponents()


  //注册设计渲染跟预览渲染用的组件
  useEffect(() => {
    const designers = { [meterial.componentName]: meterial.designer }
    const previews = { [meterial.componentName]: meterial.component }
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
      designers[slotMaterial.componentName] = slotMaterial.designer
      previews[slotMaterial.componentName] = slotMaterial.component

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

    registerDesignComponents(designers)
    registerPreviewComponents(previews)

    if (meterial.resource) {
      const resources = resourceManager?.registerResources(meterial.resource)
      setResourceNode(resources?.[0])
    }
  }, [componentManager, localesManager, meterial, registerDesignComponents, registerPreviewComponents, resourceManager])

  return resourceNode
}