import { useTranslate } from "@rxdrag/react-locales";
import { Form, Input } from "antd";
import React from "react";

export const NameItem = () => {
  const t = useTranslate();
  return (
    <Form.Item
      label={t("Name")}
      name="name"
    >
      <Input.TextArea rows = {3} />
    </Form.Item>
  )
}