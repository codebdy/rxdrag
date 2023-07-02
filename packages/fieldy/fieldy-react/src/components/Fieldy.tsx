import React from "react"
import { FieldyEngineImpl } from "@rxdrag/fieldy"
import { useMemo } from "react"
import { FieldyContext } from "../contexts"

export const Fieldy = (props: {
  children: React.ReactNode
}) => {
  const { children } = props
  const fieldy = useMemo(() => {
    return new FieldyEngineImpl(false)
  }, [])

  return fieldy && <FieldyContext.Provider value={fieldy}>
    {children}
  </FieldyContext.Provider>
}