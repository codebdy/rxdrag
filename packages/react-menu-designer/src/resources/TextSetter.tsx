import { Form, Input } from "antd"
import { memo } from "react"
import { ConfigSetterProps } from "../interfaces"
import { ITextConfig } from "./types";
import { useTranslate } from "@rxdrag/react-locales";
import { ConfigForm } from "./ConfigForm";

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