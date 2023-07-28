import React from "react"
import { FieldyEngineImpl, IValidator } from "@rxdrag/fieldy"
import { useMemo } from "react"
import { FieldyContext } from "../contexts"

export const Fieldy = (props: {
  validator?: IValidator,
  children: React.ReactNode
}) => {
  const { validator, children } = props
  const fieldy = useMemo(() => {
    return new FieldyEngineImpl(validator, false)
  }, [validator])

  return fieldy && <FieldyContext.Provider value={fieldy}>
    {children}
  </FieldyContext.Provider>
}