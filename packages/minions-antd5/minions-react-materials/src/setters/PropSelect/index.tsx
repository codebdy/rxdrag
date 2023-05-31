import { ISetPropConfig } from "@rxdrag/minions-runtime-react";
import { useTranslate } from "@rxdrag/react-locales"
import { Form, Select } from "antd"
import { memo } from "react"

export const PropSelect = memo((
  props: {
    value?: ISetPropConfig,
    onChange?: (value?: ISetPropConfig) => void,
  }
) => {
  const { value, onChange } = props;
  const t = useTranslate()
  return (<>
    <Form.Item
      label={t("component")}
    >
      <Select
        defaultValue="lucy"
        options={[{ value: 'lucy', label: 'Lucy' }]}
      />
    </Form.Item>
    <Form.Item
      label={t("prop")}
    >
      <Select
        defaultValue="lucy"
        options={[{ value: 'lucy', label: 'Lucy' }]}
      />
    </Form.Item>
  </>)
})