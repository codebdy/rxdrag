import { memo } from "react"
import { MaterialsContext } from "../context"
import { IReactionMaterial } from "../interfaces"

export const Minions = memo((
  props: {
    materials: IReactionMaterial[]
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