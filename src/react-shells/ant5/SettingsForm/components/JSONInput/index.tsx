import { EditOutlined } from "@ant-design/icons"
import { Button } from "antd"
import { useToolsTranslate } from "core-react/hooks/useToolsTranslate"
import { memo } from "react"

export const JSONInput = memo(() => {
  const t = useToolsTranslate()
  return (
    <>
      <Button icon={<EditOutlined />}>{t('edit')}</Button>
    </>
  )
})