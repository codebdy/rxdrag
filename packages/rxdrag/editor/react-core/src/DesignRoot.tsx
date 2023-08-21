import React from "react"
import { useMemo } from "react"
import { DesignComponentsContext } from "./contexts"
import { IReactComponents } from "@rxdrag/react-shared"
import { IComponentsParams } from "@rxdrag/react-runner"

export const DesignRoot = (props: {
  components?: IReactComponents,
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