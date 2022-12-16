import { Button, Space } from "antd"
import { useTranslate } from "core-react/hooks/useTranslate"
import { memo } from "react"

export const SaveActions = memo(() => {
  const t = useTranslate("tools")
  return (
    <Space>
      <Button type="primary"> {t("save")}</Button>
    </Space>
  )
})