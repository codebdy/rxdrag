import { IComponents } from "core-react";
import { DefaultSlot } from "core-react/DefaultSlot";
import { Root } from "core-react/Root";
import { isStr } from "core/utils/types";
import { useMemo } from "react";
import { Field } from "react-shells/ant5/components/Field";
import { businessMaterials, displayMaterials, fomrMaterials, inputMaterials, layoutMaterials, popupMaterials } from "../materials";

export function usePredefinedComponents() {
  const materials = useMemo(() => {
    const designers: IComponents = {
      Root:Root,
      DefaultSlot: DefaultSlot,
      Field: Field,
    }
    const components: IComponents = {
      Root:Root,
      DefaultSlot: DefaultSlot,
      Field: Field,
    }
    for (const com of [...inputMaterials,
    ...displayMaterials,
    ...fomrMaterials,
    ...popupMaterials,
    ...layoutMaterials,
    ...businessMaterials,
    ]) {
      designers[com.componentName] = com.designer
      components[com.componentName] = com.component
      if(com.slots){
        for(const key of Object.keys(com.slots)){
          const slot = com.slots[key]
          if (slot === true || slot === undefined || isStr(slot)) {
            continue
          }
          designers[slot.componentName] = slot.designer
          components[slot.componentName] = slot.component
        }
      }
    }
    return { designers, components }
  }, [])

  return materials
}