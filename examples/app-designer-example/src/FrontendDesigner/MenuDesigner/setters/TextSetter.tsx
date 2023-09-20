import { Form, Input } from "antd"
import { memo } from "react"
import { useTranslate } from "@rxdrag/react-locales";
import { ConfigForm, ConfigSetterProps } from "@rxdrag/react-menu-designer";
import { ITextConfig } from "../types";

export const TextSetter = memo((
  props: ConfigSetterProps<ITextConfig>
) => {
  const { value, onChange } = props;

  const t = useTranslate()

  return (
    <ConfigForm
      value={value}
      onChange={onChange}
    >
      <Form.Item label={t("title")} name="title">
        <Input />
      </Form.Item>
    </ConfigForm>
  )
})