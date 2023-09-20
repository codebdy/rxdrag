import { Form, Input } from "antd"
import { memo } from "react"
import { useTranslate } from "@rxdrag/react-locales";
import { ConfigForm, ConfigSetterProps } from "@rxdrag/react-menu-designer";

export const LinkSetter = memo((
  props: ConfigSetterProps
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
      <Form.Item label={t("link")} name="link">
        <Input.TextArea />
      </Form.Item>
    </ConfigForm>
  )
})