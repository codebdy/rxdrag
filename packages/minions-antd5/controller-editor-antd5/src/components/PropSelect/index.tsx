import { useTrans } from "@rxdrag/logicflow-editor-antd5"
import { Form, Select } from "antd"
import { memo } from "react"

export const PropSelect = memo(() => {
  const t = useTrans()
  return (<>
    <Form.Item
      label={t("controller")}
    >
      <Select
        defaultValue="lucy"
        style={{ width: 120 }}
        loading
        options={[{ value: 'lucy', label: 'Lucy' }]}
      />
    </Form.Item>
    <Form.Item
      label={t("variable")}
    >
      <Select
        defaultValue="lucy"
        style={{ width: 120 }}
        loading
        options={[{ value: 'lucy', label: 'Lucy' }]}
      />
    </Form.Item>
  </>)
})