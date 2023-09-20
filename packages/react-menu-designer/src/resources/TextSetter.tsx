import { Form, Input } from "antd"
import { memo } from "react"
import { ConfigSetterProps } from "../interfaces"
import { IConfigText } from "./types";
import { useTranslate } from "@rxdrag/react-locales";

export const TextSetter = memo((
  props: ConfigSetterProps<IConfigText>
) => {
  const { value, onChange } = props;

  const t = useTranslate()

  return (
    <Form>
      <Form.Item label={t("title")}>
        <Input />
      </Form.Item>
    </Form>
  )
})