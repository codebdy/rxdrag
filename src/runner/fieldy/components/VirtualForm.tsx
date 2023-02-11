
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
  const { fieldSchemas, initialValue, defaultValue, children, onValueChange } = props
  const [form, setForm] = useState<IForm>()
  const fieldy = useFieldy()
  useEffect(() => {
    if (fieldy && fieldSchemas) {
      const form = fieldy.createForm()
      setForm(form)
      return () => {
        fieldy.removeForm(form.name)
      }
    }
  }, [fieldSchemas, fieldy])

  useEffect(() => {
    if (fieldy) {
      form?.setInitialValue(initialValue||defaultValue)
    }
  }, [defaultValue, fieldy, form, initialValue])

  useEffect(() => {
    if (fieldy) {
      const unsub = form?.onValueChange((values: FormValue) => {
        onValueChange?.(values)
      })
      return unsub;
    }

  }, [fieldy, form, onValueChange])

  //form嵌套时要清空field树，添加一个FieldContext.Provider来完成
  return (
    <FieldContext.Provider value={undefined}>
      <FormContext.Provider value={form}>
        {children}
      </FormContext.Provider>
    </FieldContext.Provider>
  )
}