import { useTranslate } from "@rxdrag/react-locales";
import { Form, Modal } from "antd";
import React, { useCallback } from "react";
import { memo } from "react";
import { IProcessCategory } from "../../interfaces/process";
import CategoryForm from "./CategoryForm";
import { useSaveProcessCategory } from "../../hooks/useSaveProcessCategory";

const EditCategoryDialog = memo((
  props: {
    category: IProcessCategory,
    isModalVisible: boolean,
    onClose: () => void,
  }
) => {
  const { category, isModalVisible, onClose } = props;
  const  t  = useTranslate();

  const [form] = Form.useForm()
  const [update, { loading }] = useSaveProcessCategory({
    onComplete: () => {
      form.resetFields();
      onClose();
    }
  });

  const handleConfirm = useCallback(() => {
    form.validateFields().then((values) => {
      update({ id: category.id, name: values.name })
    });
  }, [form, update, category.id]);

  return (
    <Modal
      title={t("Pages.EditCategory")}
      open={isModalVisible}
      width={400}
      cancelText={t("Cancel")}
      okText={t("Confirm")}
      onCancel={onClose}
      onOk={handleConfirm}
      confirmLoading={loading}
    >
      <CategoryForm name={category.name} form={form} />
    </Modal>
  )
})

export default EditCategoryDialog;