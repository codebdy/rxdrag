import { useTranslate } from "@rxdrag/react-locales";
import { PackageMeta } from "@rxdrag/uml-schema";
import { Form, Input, Modal } from "antd"
import React, { memo, useCallback, useEffect } from "react"

export const PackageDialog = memo((
  props: {
    open?: boolean,
    pkg: PackageMeta,
    onClose: () => void,
    onConfirm: (pkg: PackageMeta) => void,
  }
) => {
  const { open, pkg, onClose, onConfirm } = props;
  const [form] = Form.useForm<PackageMeta>();
  useEffect(() => {
    form.setFieldsValue(pkg)
  }, [form, pkg])
  const t = useTranslate();

  const handleConfirm = useCallback(() => {
    form.validateFields().then(changeValues => {
      onConfirm({ ...pkg, ...changeValues })
    })
  }, [form, onConfirm, pkg])


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
          onClick: (e: React.MouseEvent) => {
            e.stopPropagation()
          },
        }
      }
    >
      <Form
        name="editPackage"
        labelWrap
        initialValues={{ title: "", description: "" }}
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