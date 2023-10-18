import { Form, Input } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
//import { MultiLangInput } from "plugins/inputs/components/pc/MultiLangInput/view";

export const NameItem = () => {
  const { t } = useTranslation()
  return (
    <Form.Item
      label={t("Name")}
      name="name"
    >
      {/* <MultiLangInput inline multiline title={t("Name")} /> */}
      <Input.TextArea rows = {3} />
    </Form.Item>
  )
}