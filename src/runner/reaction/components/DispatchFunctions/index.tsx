import React, { memo, useMemo } from "react"
import { ActionHandlersContext, IActionHandlers } from "./context"
import { useFunctions } from "./useFunctions"

export const DispatchFunctions = memo((props: {
  children?: React.ReactNode,
  acionHandlers: IActionHandlers
}) => {
  const { children, acionHandlers } = props
  const oldHandlers = useFunctions()
  const newHandlers = useMemo(() => {
    return { ...oldHandlers, ...acionHandlers }
  }, [acionHandlers, oldHandlers])

  return (
    <ActionHandlersContext.Provider value={newHandlers}>
      {children}
    </ActionHandlersContext.Provider>
  )
})