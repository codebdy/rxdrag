import { Button, Modal } from "antd";
import SvgIcon from "common/SvgIcon";
import { useCallback, useState } from "react";
import { memo } from "react";
import { useShowError } from "hooks/useShowError";
import CategoryForm from "./CategoryForm";
import { useTranslation } from "react-i18next";
import { createUuid } from "shared";
import { useUpsertCategory } from "../hooks/useUpsertCategory";
import { useForm } from "antd/es/form/Form";

const CreateCategoryDialog = memo(() => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = useForm()
  const { t } = useTranslation();
  const [create, { loading, error }] = useUpsertCategory({
    onCompleted: () => {
      form.resetFields();
      setIsModalVisible(false);
    }
  });

  useShowError(error);

  const showModal = useCallback(() => {
    setIsModalVisible(true);
  }, []);

  const handleCancel = useCallback(() => {
    form.resetFields();
    setIsModalVisible(false);
  }, [form]);

  const handleConfirm = useCallback((values: any) => {
    form.validateFields().then((values: any) => {
      create({ name: values.name, uuid: createUuid() })
    });
  }, [create, form]);

  return (
    <>
      <Button
        icon={
          <SvgIcon>
            <svg style={{ width: '16px', height: '16px' }} viewBox="0 0 24 24">
              <path fill="currentColor" d="M13 19C13 19.34 13.04 19.67 13.09 20H4C2.9 20 2 19.11 2 18V6C2 4.89 2.89 4 4 4H10L12 6H20C21.1 6 22 6.89 22 8V13.81C21.39 13.46 20.72 13.22 20 13.09V8H4V18H13.09C13.04 18.33 13 18.66 13 19M20 18V15H18V18H15V20H18V23H20V20H23V18H20Z" />
            </svg>
          </SvgIcon>
        }
        onClick={showModal}
      >
        {t("AppBpmn.NewCategory")}
      </Button>
      <Modal
        title={t("AppBpmn.NewCategory")}
        open={isModalVisible}
        width={400}
        cancelText={t("Cancel")}
        okText={t("Confirm")}
        onCancel={handleCancel}
        onOk={handleConfirm}
        confirmLoading={loading}
      >
        <CategoryForm form={form} />
      </Modal>
    </>
  )
})

export default CreateCategoryDialog;