import React from "react"
import { FieldyEngineImpl, IValidator } from "@rxdrag/fieldy"
import { useMemo } from "react"
import { FieldyContext } from "../contexts"
import { YupValidator } from "@rxdrag/fieldy-yup-validation"

export const Fieldy = (props: {
  validator?: IValidator,
  children: React.ReactNode
}) => {
  const { validator, children } = props
  const fieldy = useMemo(() => {
    //如果没有传入validator，则创建一个默认的YupValidator
    return new FieldyEngineImpl(validator || new YupValidator(), false)
  }, [validator])

  return fieldy && <FieldyContext.Provider value={fieldy}>
    {children}
  </FieldyContext.Provider>
}