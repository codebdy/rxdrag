import React from "react"
import { useMemo } from "react"
import { DesignComponentsContext } from "./contexts"
import { IComponents } from "@rxdrag/react-shared"
import { IComponentsParams } from "@rxdrag/react-runner"

export const DesignRoot = (props: {
  components?: IComponents,
  children: React.ReactNode,
}) => {
  const { components, children } = props
  const params: IComponentsParams = useMemo(() => {
    return {
      components: components || {},
    }
  }, [components])

  return (
    <DesignComponentsContext.Provider value={params}>
      {
        children
      }
    </DesignComponentsContext.Provider>
  )
}