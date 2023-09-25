import { useSettersTranslate } from "@rxdrag/react-core"
import { Form, Input, Switch } from "antd"
import { memo } from "react"

export const ControllerSetter = memo(() => {
  const t = useSettersTranslate()

  return (
    <>
      <Form.Item
        label={t("joinFlow")}
      >
        <Switch />
      </Form.Item>
      <Form.Item
        label={t("name")}
      >
        <Input />
      </Form.Item>
    </>
  )
})