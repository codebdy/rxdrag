import { Form, Modal } from "antd";
import React, { useCallback } from "react";
import { memo } from "react";
import ProcessForm from "./ProcessForm";
import { IProcess, IProcessCategory } from "../../interfaces/process";
import { useSaveProcess } from "../../hooks/useSaveProcess";
import { useTranslate } from "@rxdrag/react-locales";

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
  const [upsert, { loading }] = useSaveProcess({
    onComplete: () => {
      form.resetFields();
      onClose();
    }
  });
  const t = useTranslate();


  const handleConfirm = useCallback(() => {
    form.validateFields().then((newProcess: IProcess) => {
      if (newProcess.categoryId) {
        upsert({ ...process, name: newProcess.name, categoryId: newProcess.id, app: { id: "app1" } });
      } else {
        upsert({ ...process, name: newProcess.name, categoryId: "", app: { id: "app1" } });
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
      <ProcessForm process={process} categories={categories || []} form={form} />
    </Modal>
  )
})

export default EditProccessDialog;