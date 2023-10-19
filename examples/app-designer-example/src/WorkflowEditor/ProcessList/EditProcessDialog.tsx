import { Form, Modal } from "antd";
import React, { useCallback } from "react";
import { memo } from "react";
import ProcessForm from "./ProcessForm";
import { IProcess, IProcessCategory } from "model";
import { useShowError } from "hooks/useShowError";
import { useTranslation } from "react-i18next";
import { useUpsertProcess } from "../hooks/useUpsertProcess";

const EditProccessDialog = memo((
  props: {
    process: IProcess,
    categories?: IProcessCategory[],
    isModalVisible: boolean,
    onClose: () => void,
  }
) => {
  const { process, categories, isModalVisible, onClose } = props;
  const [form] = Form.useForm()
  const [upsert, { loading, error }] = useUpsertProcess({
    onCompleted: () => {
      form.resetFields();
      onClose();
    }
  });
  const { t } = useTranslation();
  useShowError(error);

  const handleConfirm = useCallback(() => {
    form.validateFields().then((values: any) => {
      if (values.categoryUuid) {
        upsert({ ...process as any, name: values.title, categoryUuid: values.categoryUuid });
      } else {
        upsert({ ...process as any, name: values.title, categoryUuid: "" });
      }
    });
  }, [form, process, upsert]);

  return (
    <Modal
      title={t("Pages.EidtPage")}
      open={isModalVisible}
      width={580}
      cancelText={t("Cancel")}
      okText={t("Confirm")}
      onCancel={onClose}
      onOk={handleConfirm}
      confirmLoading={loading}
    >
      <ProcessForm process={process} categories={categories as any} form={form} />
    </Modal>
  )
})

export default EditProccessDialog;