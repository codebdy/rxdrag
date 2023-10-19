import { useTranslate } from "@rxdrag/react-locales";
import { Form, FormInstance, Input } from "antd";
import React, { useCallback } from "react";
import { memo } from "react";

const CategoryForm = memo((
  props: {
    name?: string,
    form: FormInstance<any>
  }
) => {
  const { name, form } = props;
  const t = useTranslate();
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
        <Input  />
      </Form.Item>
    </Form>
  )
})

export default CategoryForm;