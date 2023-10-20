import { useTranslate } from "@rxdrag/react-locales";
import { Form, FormInstance, Input } from "antd";
import React, { useCallback } from "react";
import { memo } from "react";
import { IProcessCategory } from "../../interfaces/process";

const CategoryForm = memo((
  props: {
    name?: string,
    form: FormInstance<IProcessCategory>
  }
) => {
  const { name, form } = props;
  const t = useTranslate();
  const handleKeyUp = useCallback((event: React.KeyboardEvent<HTMLElement>) => {
    event.stopPropagation();
  }, [])

  return (
    <Form
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
      form={form}
      autoComplete="off"
      initialValues={{ name }}
      onKeyUp={handleKeyUp}
    >
      <Form.Item
        label={t("CagegoryName")}
        name="name"
        rules={[{ required: true, message: t("Required") }]}
      >
        <Input  />
      </Form.Item>
    </Form>
  )
})

export default CategoryForm;