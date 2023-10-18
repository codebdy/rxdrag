import { Form, FormInstance } from "antd";
import { MultiLangInput } from "components/MultiLangInput";
import React, { useCallback } from "react";
import { memo } from "react";
import { useTranslation } from "react-i18next";

const CategoryForm = memo((
  props: {
    name?: string,
    form: FormInstance<any>
  }
) => {
  const { name, form } = props;
  const { t } = useTranslation();
  const handleKeyUp = useCallback((event: React.KeyboardEvent<HTMLElement>) => {
    event.stopPropagation();
  }, [])

  return (
    <Form
      name="eidtCategory"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
      form={form}
      autoComplete="off"
      initialValues={{ name }}
      onKeyUp={handleKeyUp}
    >
      <Form.Item
        label={t("AppBpmn.CagegoryName")}
        name="name"
        rules={[{ required: true, message: t("Required") }]}
      >
        <MultiLangInput title={t("AppBpmn.CagegoryName")} />
      </Form.Item>
    </Form>
  )
})

export default CategoryForm;