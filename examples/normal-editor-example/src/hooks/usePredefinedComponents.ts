import { Root } from "@rxdrag/react-core";
import { IReactComponents, ReactComponent } from "@rxdrag/react-shared";
import { isStr } from "@rxdrag/shared";
import { useMemo } from "react";
import { materials } from "example-common";

//本代码后期删掉
export function usePredefinedComponents() {
  const coms = useMemo(() => {
    const designers: IReactComponents = {
      Root: Root,
    }
    const components: IReactComponents = {
      Root: Root,
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

    return { designers, components }
  }, [])

  return coms
}