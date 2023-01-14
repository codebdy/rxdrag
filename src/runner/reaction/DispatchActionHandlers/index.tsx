import React, { memo, useMemo } from "react"
import { ActionHandlersContext, IActionHandlers } from "./context"
import { useActionHandlers } from "./useActionHandlers"

export const DispatchActionHandlers = memo((props: {
  children?: React.ReactNode,
  acionHandlers: IActionHandlers
}) => {
  const { children, acionHandlers } = props
  const oldHandlers = useActionHandlers()
  const newHandlers = useMemo(() => {
    return { ...oldHandlers, ...acionHandlers }
  }, [acionHandlers, oldHandlers])

  return (
    <ActionHandlersContext.Provider value={newHandlers}>
      {children}
    </ActionHandlersContext.Provider>
  )
})