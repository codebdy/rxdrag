import { Form, Input } from "antd"
import { memo } from "react"
import { useTranslate } from "@rxdrag/react-locales";
import { ConfigForm, ConfigSetterProps } from "@rxdrag/react-menu-designer";
import { IconInput } from "@rxdrag/react-antd-props-inputs";

export const GroupSetter = memo((
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
      <Form.Item label={t("icon")} name="icon">
        <IconInput />
      </Form.Item>
    </ConfigForm>
  )
})