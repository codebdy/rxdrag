import { FormValue, IForm } from "@rxdrag/fieldy"
import React, { useEffect, useState } from "react"
import { FieldContext, FormContext } from "../contexts"
import { useFieldy } from "../hooks"

export const VirtualForm = (props: {
  initialValue?: FormValue | undefined,
  defaultValue?: FormValue | undefined,
  value?: FormValue | undefined,
  onValueChange?: (value?: FormValue | undefined) => void,
  children?: React.ReactNode
}) => {
  const { initialValue, defaultValue, value, children, onValueChange } = props
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
      form.setInitialValue(initialValue)
    }
  }, [fieldy, form, initialValue])

  useEffect(() => {
    if (fieldy && form) {
      form.setDefaultValue(defaultValue)
    }
  }, [defaultValue, fieldy, form])

  useEffect(() => {
    if (fieldy && form) {
      form.setValue(value)
    }
  }, [fieldy, form, value])

  useEffect(() => {
    if (fieldy) {
      const unsub = form?.onValueChange((value: FormValue | undefined) => {
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