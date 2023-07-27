import { useSettersTranslate } from "@rxdrag/react-core"
import { Button, Form } from "antd"
import { memo } from "react"

export const WhenInput = memo(() => {
  const t = useSettersTranslate()
  return (
    <>
      <Form.Item label={t("customized")}>
        <Button>{t("configRules")}</Button>
      </Form.Item>
    </>
  )
})