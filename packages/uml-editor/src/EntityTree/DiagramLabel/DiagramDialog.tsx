import { Form, Modal } from "antd"
import React, { memo, useCallback, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { MultiLangInput } from "components/MultiLangInput"
import { DiagramMeta } from "../../meta/DiagramMeta"

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
  const { t } = useTranslation();

  const handleConfirm = useCallback(() => {
    form.validateFields().then(changeValues => {
      onConfirm({ ...diagram, ...changeValues })
    })
  }, [form, onConfirm, diagram])

  return (
    <Modal
      title={t("UmlEditor.PackageInfo")}
      open={open}
      cancelText={t("Cancel")}
      okText={t("Confirm")}
      onCancel={onClose}
      onOk={handleConfirm}
      centered
      wrapProps={
        {
          onClick: (e:any) => {
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
          <MultiLangInput inline title={t("Name")} />
        </Form.Item>
      </Form>
    </Modal>
  )
})