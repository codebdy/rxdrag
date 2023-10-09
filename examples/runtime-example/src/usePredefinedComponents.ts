import { IReactComponents, ReactComponent } from "@rxdrag/react-shared";
import { isStr } from "@rxdrag/shared";
import { useMemo } from "react";
import { materials } from "example-common";
import styled from "styled-components";

const RootComponent = styled.div`
  min-height: 100%;
  min-width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-flow: column;
`

//冗余代码，需要想办法删掉
export function usePredefinedComponents() {
  const coms = useMemo(() => {
    const components: IReactComponents = {
      Root: RootComponent,
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

    return components
  }, [])

  return coms
}