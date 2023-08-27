import { IReactComponents, ReactComponent } from "@rxdrag/react-shared";
import { isStr } from "@rxdrag/shared";
import { useMemo } from "react";
import { Field } from "@rxdrag/react-antd-components";
import { materials, slots } from "example-common";
import { PageDesigner, PagePreview } from "../page";

export function usePredefinedComponents() {
  const coms = useMemo(() => {
    const designers: IReactComponents = {
      Page: PageDesigner,
      Field: Field,
    }
    const components: IReactComponents = {
      Page: PagePreview,
      Field: Field,
    }
    for (const com of materials) {
      designers[com.componentName] = com.designer
      components[com.componentName] = com.component
      if (com.slots) {
        for (const key of Object.keys(com.slots)) {
          const slot = com.slots[key]
          if (slot === true || slot === undefined || isStr(slot)) {
            continue
          }
          designers[slot.componentName] = slot.designer as ReactComponent
          components[slot.componentName] = slot.component as ReactComponent
        }
      }
    }

    for (const com of slots) {
      designers[com.componentName] = com.designer
      components[com.componentName] = com.component
    }

    return { designers, components }
  }, [])

  return coms
}