import { IReactComponents, ReactComponent } from "@rxdrag/react-shared";
import { isStr } from "@rxdrag/shared";
import { useMemo } from "react";
import { Field } from "@rxdrag/react-antd-components";
import { materials, slots } from "example-common";
import styled from "styled-components";

const RootComponent = styled.div`
  min-height: 100%;
  min-width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-flow: column;
`


export function usePredefinedComponents() {
  const coms = useMemo(() => {
    const components: IReactComponents = {
      Root: RootComponent,
      Field: Field,
    }
    for (const com of materials) {
      components[com.componentName] = com.component
      if (com.slots) {
        for (const key of Object.keys(com.slots)) {
          const slot = com.slots[key]
          if (slot === true || slot === undefined || isStr(slot)) {
            continue
          }
          components[slot.componentName] = slot.component as ReactComponent
        }
      }
    }

    for (const com of slots) {
      components[com.componentName] = com.component
    }

    return components
  }, [])

  return coms
}