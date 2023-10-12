import { FormValue, IForm } from "@rxdrag/fieldy"
import React, { useEffect, useState } from "react"
import { FieldContext, FormContext } from "../contexts"
import { useFieldy } from "../hooks"

export const VirtualForm = (props: {
  name?: string,
  initialValue?: FormValue | undefined,
  defaultValue?: FormValue | undefined,
  value?: FormValue | undefined,
  onValueChange?: (value?: FormValue | undefined) => void,
  children?: React.ReactNode
}) => {
  const { name, initialValue, defaultValue, value, children, onValueChange } = props
  const [form, setForm] = useState<IForm>()
  const fieldy = useFieldy()
  useEffect(() => {
    if (fieldy) {
      const form = fieldy.createForm({ name })
      setForm(form)
      return () => {
        fieldy.removeForm(form.name)
      }
    }
  }, [fieldy, name])

  useEffect(() => {
    if (fieldy && form) {
      console.log("===>setInitialValue", initialValue)
      form.setInitialValue(initialValue)
    }
  }, [fieldy, form, initialValue])

  useEffect(() => {
    if (fieldy && form) {
      form.setDefaultValue(defaultValue)
    }
  }, [defaultValue, fieldy, form])

  useEffect(() => {
    if (fieldy && form && value !== undefined) {
      form.setValue(value)
    }
  }, [fieldy, form, value])

  useEffect(() => {
    if (fieldy) {
      const unsub = form?.onValueChange((value: FormValue | undefined) => {
        if (form.getModified()) {
          onValueChange?.(value)
        }
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