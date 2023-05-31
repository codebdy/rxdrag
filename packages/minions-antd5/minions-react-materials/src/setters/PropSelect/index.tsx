import { useTranslate } from "@rxdrag/react-locales"
import { Form, Select } from "antd"
import { memo } from "react"

export const PropSelect = memo(() => {
  const t = useTranslate()
  return (<>
    <Form.Item
      label={t("component")}
    >
      <Select
        defaultValue="lucy"
        style={{ width: 120 }}
        options={[{ value: 'lucy', label: 'Lucy' }]}
      />
    </Form.Item>
    <Form.Item
      label={t("prop")}
    >
      <Select
        defaultValue="lucy"
        style={{ width: 120 }}
        options={[{ value: 'lucy', label: 'Lucy' }]}
      />
    </Form.Item>
  </>)
})