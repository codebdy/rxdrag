import { EllipsisOutlined } from "@ant-design/icons"
import { useSettersTranslate } from "@rxdrag/react-core"
import { Button, Input, Popover, Space } from "antd"
import { memo, useCallback, useState } from "react"

export const MessageInput = memo(() => {
  const [open, setOpen] = useState(false)
  const t = useSettersTranslate()

  const handleOpenChange = useCallback((open: boolean) => {
    setOpen(open)
  }, [])

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [])

  const handleConfirm = useCallback(() => {
    setOpen(false)
  }, [])


  return (<Popover
    open={open}
    content={
      <div>
        <Input.TextArea rows={6} allowClear />
        <div style={{ display: 'flex', justifyContent: "flex-end", paddingTop: 16 }}>
          <Space>
            <Button type="text" onClick={handleClose}>{t("cancel")}</Button>
            <Button type="primary" onClick={handleConfirm}>{t("confirm")}</Button>
          </Space>
        </div>
      </div>
    }
    placement="bottom"
    title={t("errorMessage")}
    trigger="click"
    onOpenChange={handleOpenChange}
  >
    <Button icon={<EllipsisOutlined />}></Button>
  </Popover>)
})