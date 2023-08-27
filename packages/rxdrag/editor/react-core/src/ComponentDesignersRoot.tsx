import React from "react"
import { useMemo } from "react"
import { ComponentDesignersContext } from "./contexts"
import { IReactComponents } from "@rxdrag/react-shared"

export const ComponentDesignersRoot = (props: {
  components?: IReactComponents,
  children: React.ReactNode,
}) => {
  const { components, children } = props
  const value: IReactComponents = useMemo(() => {
    return (components || {})
  }, [components])

  return (
    <ComponentDesignersContext.Provider value={value}>
      {
        children
      }
    </ComponentDesignersContext.Provider>
  )
}