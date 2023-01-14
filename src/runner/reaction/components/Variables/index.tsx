import React, { memo, useMemo } from "react"
import { VariablesContext } from "./context"
import { useVariables } from "./useVariables"

export const Variables = memo((props: {
  children?: React.ReactNode,
  variables: string[]
}) => {
  const { children, variables } = props
  const oldVariables = useVariables()
  const newVariables = useMemo(() => {
    return { ...oldVariables }
  }, [oldVariables])

  return (
    <VariablesContext.Provider value={newVariables}>
      {children}
    </VariablesContext.Provider>
  )
})