
import React, { useEffect, useState } from "react"
import { FormNameContext } from "../contexts"
import { useFieldy } from "../hooks"
import { IFieldMetas, FormState, FormValue } from "../interfaces"

export const VirtualForm = (props: {
  fieldMetas: IFieldMetas
  initialValue?: any,
  defaultValue?: any,
  onValueChange?: (value?: any) => void,
  children?: React.ReactNode
}) => {
  const { fieldMetas, initialValue, children, onValueChange } = props
  const [name, setName] = useState<string>()
  const [formState, setFormState] = useState<FormState>()
  const fieldy = useFieldy()

  useEffect(() => {
    if (fieldy && fieldMetas) {
      const name = fieldy.createForm()
      fieldy.setFormFieldMetas(name, fieldMetas)
      setFormState(fieldy.getForm(name))
      setName(name)
      return () => {
        fieldy.removeForm(name)
      }
    }
  }, [fieldMetas, fieldy])

  useEffect(() => {
    if (fieldy && formState?.mounted && name) {
      fieldy?.setFormInitialValue(name, initialValue)
    }
  }, [fieldy, formState?.mounted, initialValue, name])

  useEffect(() => {
    if (fieldy && name) {
      const unsub = fieldy?.subscribeToFormValuesChange(name, (values: FormValue) => {
        onValueChange?.(values)
      })
      return unsub;
    }

  }, [fieldy, name, onValueChange])

  return (
    <FormNameContext.Provider value={name}>
      {children}
    </FormNameContext.Provider>
  )
}