
import React, { useEffect, useState } from "react"
import { FieldContext, FormContext } from "../contexts"
import { useFieldy } from "../hooks"
import { FormValue, IForm } from "../interfaces"

export const VirtualForm = (props: {
  initialValue?: any,
  defaultValue?: any,
  onValueChange?: (value?: any) => void,
  children?: React.ReactNode
}) => {
  const { initialValue, defaultValue, children, onValueChange } = props
  const [form, setForm] = useState<IForm>()
  const fieldy = useFieldy()

  useEffect(() => {
    if (fieldy) {
      const form = fieldy.createForm()
      setForm(form)
      return () => {
        fieldy.removeForm(form.name)
      }
    }
  }, [fieldy])

  useEffect(() => {
    if (fieldy && form) {
      form.setInitialValue(initialValue || defaultValue)
    }
  }, [defaultValue, fieldy, form, initialValue])

  useEffect(() => {
    if (fieldy) {
      const unsub = form?.onValueChange((value: FormValue) => {
        onValueChange?.(value)
      })
      return unsub;
    }

  }, [fieldy, form, onValueChange])

  //form嵌套时要清空field树，添加一个FieldContext.Provider来完成
  return (
    <FieldContext.Provider value={undefined}>
      <FormContext.Provider value={form}>
        {form && children}
      </FormContext.Provider>
    </FieldContext.Provider>
  )
}