import { FormValue, IForm } from "@rxdrag/fieldy"
import React, { memo, useEffect, useState } from "react"
import { FieldContext, FormContext } from "../contexts"
import { useFieldy } from "../hooks"

export const VirtualForm = memo((props: {
  name?: string,
  initialValue?: FormValue | undefined,
  value?: FormValue | undefined,
  onValueChange?: (value?: FormValue | undefined) => void,
  //表达式中用到的变量
  expContext?: Record<string, unknown>,
  children?: React.ReactNode
}) => {
  const { name, initialValue, value, children, onValueChange, expContext } = props
  const [form, setForm] = useState<IForm>()
  const fieldy = useFieldy()
  useEffect(() => {
    if (fieldy) {
      const form = fieldy.createForm({ name },)
      setForm(form)
      return () => {
        fieldy.removeForm(form.name)
      }
    }
  }, [fieldy, name])

  useEffect(() => {
    form?.setExpContext(expContext)
  }, [expContext, form])

  useEffect(() => {
    if (fieldy && form) {
      form.setInitialValue(initialValue)
    }
  }, [fieldy, form, initialValue])

  // useEffect(() => {
  //   if (fieldy && form) {
  //     form.setDefaultValue(defaultValue)
  //   }
  // }, [defaultValue, fieldy, form])

  useEffect(() => {
    if (fieldy && form && value !== undefined) {
      form.setValue(value)
    }
  }, [fieldy, form, value])

  useEffect(() => {
    if (fieldy) {
      const unsub = form?.onValueChange((val: FormValue | undefined) => {
        if (form.getModified()) {
          onValueChange?.(val)
        }
      })
      return unsub;
    }

  }, [fieldy, form, onValueChange, value])

  //form嵌套时要清空field树，添加一个FieldContext.Provider来完成
  return (
    <FieldContext.Provider value={undefined}>
      <FormContext.Provider value={form}>
        {children}
      </FormContext.Provider>
    </FieldContext.Provider>
  )
})