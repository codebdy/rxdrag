import { useTranslate } from "@rxdrag/react-locales";
import { Form, Input, Modal } from "antd"
import React, { memo, useCallback, useEffect } from "react"
import { DiagramMeta } from "../../interfaces";

export const DiagramDialog = memo((
  props: {
    open?: boolean,
    diagram: DiagramMeta,
    onClose: () => void,
    onConfirm: (diagram: DiagramMeta) => void,
  }
) => {
  const { open, diagram, onClose, onConfirm } = props;
  const [form] = Form.useForm<DiagramMeta>();
  useEffect(() => {
    form.setFieldsValue(diagram)
  }, [form, diagram])
  const t = useTranslate();

  const handleConfirm = useCallback(() => {
    form.validateFields().then(changeValues => {
      onConfirm({ ...diagram, ...changeValues })
    })
  }, [form, onConfirm, diagram])

  return (
    <Modal
      title={t("PackageInfo")}
      open={open}
      cancelText={t("Cancel")}
      okText={t("Confirm")}
      onCancel={onClose}
      onOk={handleConfirm}
      centered
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
        name="editDialog"
        labelWrap
        initialValues={{ title: "", description: "" }}
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