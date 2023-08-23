import React from "react"
import { useMemo } from "react"
import { ComponentsContext } from "./contexts"
import { IReactComponents } from "@rxdrag/react-shared"

export const ComponentsRoot = (props: {
  components?: IReactComponents,
  children: React.ReactNode,
}) => {
  const { components, children } = props
  const value: IReactComponents = useMemo(() => {
    return (components || {})
  }, [components])

  return (
    <ComponentsContext.Provider value={value}>
      {
        children
      }
    </ComponentsContext.Provider>
  )
}