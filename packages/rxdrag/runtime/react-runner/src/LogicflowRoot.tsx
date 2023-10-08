import { LogicDefines, LogicDefinesContext } from "@rxdrag/minions-runtime-react"
import { memo } from "react"

export const LogicflowRoot = memo((
  props: {
    defines?: LogicDefines,
    children?: React.ReactNode,
  }
) => {
  const { defines, children } = props;
  return (
    <LogicDefinesContext.Provider value={defines}>
      {children}
    </LogicDefinesContext.Provider>
  )
})