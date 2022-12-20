import { Form } from "antd"
import { FormValue, useFieldy, useFormName } from "fieldy"
import React, { memo, useCallback, useEffect } from "react"

export const MetaForm = memo((
  props: {
    children?: React.ReactNode
  }
) => {
  const { children } = props
  const formName = useFormName()
  const fieldy = useFieldy()
  const [form] = Form.useForm()

  const handleValuesChange = useCallback((changedValues: any, values: any) => {
    if (formName) {
      fieldy?.setFormFlatValues(formName, values)
    }
  }, [fieldy, formName]);

  const handleVirtualFormChange = useCallback((values: FormValue, flatValues: FormValue) => {
    form.setFieldsValue(flatValues)
  }, [form])

  const handleInitialized = useCallback(() => {
    if (formName) {
      form.setFieldsValue(fieldy?.getFormFlatValues(formName))
    }
  }, [fieldy, form, formName])


  useEffect(() => {
    if (fieldy && formName) {
      const unsub = fieldy.subscribeToFormValuesChange(formName, handleVirtualFormChange)
      return unsub
    }
  }, [fieldy, formName, handleVirtualFormChange])

  useEffect(() => {
    if (fieldy && formName) {
      const unsub = fieldy.subscribeToFormInitialized(formName, handleInitialized)
      return unsub
    }
  }, [fieldy, formName, handleInitialized])

  return (
    <Form
      form={form}
      labelAlign="left"
      colon = {false}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      autoComplete="off"
      onValuesChange={handleValuesChange}
      style={{
        flex:1,
        height:'100%',
      }}
    >
      {
        children
      }
    </Form>
  )
})