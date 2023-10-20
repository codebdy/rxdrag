import { useTranslate } from "@rxdrag/react-locales";
import { Form, Modal } from "antd"
import { memo, useCallback, useEffect } from "react"
import { IExtension } from "../../../interfaces/extension";
import { MethodFormCommonItems } from "./MethodFormCommonItems";

export const ExtensionDialog = memo((
  props: {
    title?: string,
    open?: boolean,
    extension?: IExtension,
    onClose: () => void,
    onConfirm: (extension: IExtension) => void,
    saving?: boolean,
  }
) => {
  const { title, open, extension, onClose, onConfirm, saving } = props;
  const [form] = Form.useForm<IExtension>();
  useEffect(() => {
    if (extension) {
      form.setFieldsValue(extension)
    }

  }, [form, extension])
  const t = useTranslate();

  const handleConfirm = useCallback(() => {
    form.validateFields().then(changeValues => {
      onConfirm(changeValues)
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
        initialValues={extension || { title: "", description: "" }}
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 16 }}
        form={form}
        autoComplete="off"
      >
        {
          extension && <MethodFormCommonItems method={extension} />
        }
      </Form>
    </Modal>
  )
})