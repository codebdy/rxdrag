import { useTranslate } from "@rxdrag/react-locales";
import { Form, Input, Modal } from "antd"
import { memo, useCallback, useEffect } from "react"

export const NameDialog = memo((
  props: {
    title?: string,
    open?: boolean,
    name?: string,
    onClose: () => void,
    onConfirm: (name: string) => void,
    saving?: boolean,
  }
) => {
  const { title, open, name, onClose, onConfirm, saving } = props;
  const [form] = Form.useForm<{ name: string }>();
  useEffect(() => {
    form.setFieldsValue({ name })
  }, [form, name])
  const t = useTranslate();

  const handleConfirm = useCallback(() => {
    form.validateFields().then(changeValues => {
      onConfirm(changeValues?.name)
      form.resetFields()
    })
  }, [form, onConfirm])

  const handleCancel = useCallback(() => {
    form.resetFields()
    onClose?.()
  }, [form, onClose])

  return (
    <Modal
      title={title}
      open={open}
      cancelText={t("Cancel")}
      okText={t("Confirm")}
      onCancel={handleCancel}
      onOk={handleConfirm}
      okButtonProps={{ loading: saving }}
      centered
      forceRender
      wrapProps={
        {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onClick: (e: any) => {
            e.stopPropagation()
          },
        }
      }
    >
      <Form
        labelWrap
        initialValues={{ name }}
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 16 }}
        form={form}
        autoComplete="off"
      >
        <Form.Item
          label={t("Name")}
          name="name"
          rules={[{ required: true, message: t("Required") }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
})