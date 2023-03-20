import { useTranslate } from "@rxdrag/react-core"
import { Button, Space } from "antd"
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