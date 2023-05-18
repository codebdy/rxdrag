import React, { memo, ReactNode } from "react"
import { IActivityMaterial } from "@rxdrag/minions-schema"

export const Minions = memo((
  props: {
    materials: IActivityMaterial<ReactNode>[]
    children?: React.ReactNode
  }
) => {
  const { materials, children } = props
  return (
    <MaterialsContext.Provider value={materials}>
      {children}
    </MaterialsContext.Provider>
  )
})