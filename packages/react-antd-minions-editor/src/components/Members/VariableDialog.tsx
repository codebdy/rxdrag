import React from "react"
import { IVariableDefineMeta } from "@rxdrag/schema"
import { Form, Input, Modal } from "antd"
import { memo, useCallback, useEffect } from "react"
import { useTrans } from "../../hooks/useTrans"
import { ValueInput } from "@rxdrag/react-antd-props-inputs"

export const VariableDialog = memo((
  props: {
    title: string,
    open?: boolean,
    onOk?: (value?: IVariableDefineMeta) => void,
    onCancel?: () => void,
    value?: IVariableDefineMeta,
  }
) => {
  const { title, value, onOk, onCancel, ...other } = props
  const t = useTrans()
  const [form] = Form.useForm()

  const handleOk = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    form.validateFields().then((values: any) => {
      onOk?.({ ...value, ...values })
      form.resetFields()
    })
  }, [form, onOk, value])

  useEffect(() => {
    form.setFieldsValue(value)
  }, [form, value])

  const handleCancel = useCallback(() => {
    form.resetFields()
    onCancel?.()
  }, [form, onCancel])

  return (
    <Modal {...other}
      forceRender
      title={t(title)}
      okText={t('$confirm')}
      cancelText={t('$cancel')}
      onOk={handleOk}
      onCancel={handleCancel}
      width={380}
    >
      <Form
        name="name-input-form"
        form={form}
        labelCol={{ span: 4 }}
        labelAlign="left"
        autoComplete="off"
        initialValues={value}
      >
        <Form.Item
          name="name"
          required
          label={t("$name")}
          rules={[{ required: true, message: t("$pleaseInputName") }]}
        ><Input /></Form.Item>
        <Form.Item
          name="defaultValue"
          label={t("$defaultValue")}
        ><ValueInput /></Form.Item>
      </Form>
    </Modal>
  )
})