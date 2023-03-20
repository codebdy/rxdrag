import React from "react"
import { Form, Input, Modal } from "antd"
import { memo, useCallback } from "react"
import { useTrans } from "../../hooks/useTrans"

export const NameDialog = memo((
  props: {
    title: string,
    open?: boolean,
    onOk?: (value?: string) => void,
    onCancel?: () => void,
    value?: string,
  }
) => {
  const { title, value, onOk, onCancel, ...other } = props
  const t = useTrans()
  const [form] = Form.useForm()

  const handleOk = useCallback(() => {
    form.validateFields().then((values: any) => {
      onOk?.(values?.name)
      form.resetFields()
    })
  }, [form, onOk])

  const handleCancel = useCallback(() => {
    form.resetFields()
    onCancel?.()
  }, [form, onCancel])

  return (
    <Modal {...other}
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
        initialValues={{ name: value }}
      >
        <Form.Item
          name="name"
          required
          label={t("$name")}
          rules={[{ required: true, message: t("$pleaseInputName") }]}
        ><Input /></Form.Item>
      </Form>
    </Modal>
  )
})