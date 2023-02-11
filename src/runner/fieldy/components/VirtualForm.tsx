
import React, { useEffect, useState } from "react"
import { FieldContext, FormContext } from "../contexts"
import { useFieldy } from "../hooks"
import { IFieldSchema, FormValue, IForm } from "../interfaces"

export const VirtualForm = (props: {
  fieldSchemas: IFieldSchema[]
  initialValue?: any,
  defaultValue?: any,
  onValueChange?: (value?: any) => void,
  children?: React.ReactNode
}) => {
  const { fieldSchemas, initialValue, children, onValueChange } = props
  const [form, setForm] = useState<IForm>()
  //const [formState, setFormState] = useState<FormState>()
  const fieldy = useFieldy()
  useEffect(() => {
    if (fieldy && fieldSchemas) {
      const form = fieldy.createForm()
      // fieldy.setFormFieldMetas(name, fieldSchemas)
      // setFormState(fieldy.getForm(name))
      setForm(form)
      return () => {
        fieldy.removeForm(form.name)
      }
    }
  }, [fieldSchemas, fieldy])

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

  }, [fieldy, formState, name, onValueChange])

  //form嵌套时要清空field树，添加一个FieldContext.Provider来完成
  return (
    <FieldContext.Provider value={undefined}>
      <FormContext.Provider value={form}>
        {children}
      </FormContext.Provider>
    </FieldContext.Provider>
  )
}