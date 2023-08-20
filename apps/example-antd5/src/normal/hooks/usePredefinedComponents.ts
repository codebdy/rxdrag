import { Root } from "@rxdrag/react-core";
import { IComponents, ReactComponent } from "@rxdrag/react-shared";
import { isStr } from "@rxdrag/shared";
import { useMemo } from "react";
import {Field} from "@rxdrag/react-antd-components";
import { resources, slots } from "../materials";

export function usePredefinedComponents() {
  const coms = useMemo(() => {
    const designers: IComponents = {
      Root: Root,
      Field: Field,
    }
    const components: IComponents = {
      Root: Root,
      Field: Field,
    }
    for (const mGroup of resources) {
      for (const com of mGroup.items) {
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
    }

    for (const com of slots) {
      designers[com.componentName] = com.designer
      components[com.componentName] = com.component
    }

    return { designers, components }
  }, [])

  return coms
}