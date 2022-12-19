import { Button, Space } from "antd"
import { useTranslate } from "core-react/hooks/useTranslate"
import { memo } from "react"
import { useSaveJson } from "../hooks/useSaveJson"

export const SaveButton = memo(() => {
  const t = useTranslate("tools")
  const save = useSaveJson();
  return (
    <Space>
      <Button type="primary" onClick={save}> {t("save")}</Button>
    </Space>
  )
})