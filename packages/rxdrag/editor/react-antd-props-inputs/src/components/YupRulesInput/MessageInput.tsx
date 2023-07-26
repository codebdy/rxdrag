import { EllipsisOutlined } from "@ant-design/icons"
import { useSettersTranslate } from "@rxdrag/react-core"
import { Button, Input, Popover, Space } from "antd"
import { memo, useCallback, useState } from "react"
import styled from "styled-components"

const Content = styled.div`
  width: 280px;
`

const ContentFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
`

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
      <Content>
        <Input.TextArea rows={4} allowClear />
        <ContentFooter>
          <Space>
            <Button type="text" onClick={handleClose}>{t("cancel")}</Button>
            <Button type="primary" onClick={handleConfirm}>{t("confirm")}</Button>
          </Space>
        </ContentFooter>
      </Content>
    }
    placement="bottom"
    title={t("infoMessage")}
    trigger="click"
    onOpenChange={handleOpenChange}
  >
    <Button icon={<EllipsisOutlined />}></Button>
  </Popover>)
})