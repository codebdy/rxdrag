import React, { memo, ReactNode } from "react"
import { MaterialsContext } from "../context"
import { IReactionMaterial } from "@rxdrag/schema"

export const Minions = memo((
  props: {
    materials: IReactionMaterial<ReactNode>[]
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