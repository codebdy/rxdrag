import { Form, Input, Modal } from "antd"
import { memo, useCallback, useEffect } from "react"
import { ValueInput } from "react-shells/ant5/SettingsForm/components/ValueInput"
import { IVariableDefineMeta } from "runner/minions"
import { useTrans } from "../../hooks/useTrans"


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
    form.validateFields().then((values: any) => {
      onOk?.({...value, ...values})
      form.resetFields()
    })
  }, [form, onOk, value])

  useEffect(()=>{
    form.setFieldsValue(value)
  }, [form, value])

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