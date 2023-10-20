import { useTranslate } from "@rxdrag/react-locales";
import { Form, Input } from "antd";
import React from "react";

export const DocumentItem = () => {
  const t = useTranslate();
  return (
    <Form.Item
      label={t("AppBpmn.ElementDocumentation")}
      name="documentation"
    >
      {/* <MultiLangInput inline multiline rows={3} title={t("Model.ElementDocumentation")} /> */}
      <Input.TextArea rows={3} />
    </Form.Item>
  )
}