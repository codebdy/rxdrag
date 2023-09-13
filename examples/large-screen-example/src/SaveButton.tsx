import { useTranslate } from "@rxdrag/react-locales"
import { Button, Space } from "antd"
import { useSaveJson } from "example-common"
import { memo } from "react"

export const SaveButton = memo(() => {
  const t = useTranslate("setters")
  const save = useSaveJson();
  return (
    <Space>
      <Button type="primary" onClick={save}> {t("save")}</Button>
    </Space>
  )
})