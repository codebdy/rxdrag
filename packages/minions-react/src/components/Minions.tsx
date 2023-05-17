import React, { memo, ReactNode } from "react"
import { MaterialsContext } from "../context"
import { IActivityMaterial } from "@rxdrag/minions"

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