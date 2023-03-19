import React, { memo, ReactNode } from "react"
import { MaterialsContext } from "../context"
import { ReactionMaterialCategory } from "@rxdrag/schema"

export const Minions = memo((
  props: {
    materials: ReactionMaterialCategory<ReactNode>[]
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