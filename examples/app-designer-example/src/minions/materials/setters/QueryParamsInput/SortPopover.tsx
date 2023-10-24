import { useTranslate } from "@rxdrag/react-locales"
import { orderIcon } from "@rxdrag/react-shared"
import { Popover, Button, Space } from "antd"
import { memo, useCallback, useState } from "react"
import styled from "styled-components"
import { Footer } from "./Footer"
import { PlusOutlined } from "@ant-design/icons"

const Content = styled.div`
  display: flex;
  flex-flow: column;
`

export const SortPopover = memo(() => {
  const [open, setOpen] = useState<boolean>()

  const t = useTranslate()

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [])

  const handleConfirm = useCallback(() => {
    setOpen(false)
  }, [])

  return (
    <Popover
      arrow
      open={open}
      placement="bottom"
      onOpenChange={setOpen}
      content={<Content>
        过几天再做吧，根本做不完
        <Button icon={<PlusOutlined />} />
        <Footer>
          <span />
          <Space>
            <Button
              onClick={handleClose}
            >{t("cancel")}</Button>
            <Button type="primary"
              onClick={handleConfirm}
            >{t("confirm")}</Button>
          </Space>
        </Footer>
      </Content>}
      title={t("order")}
      trigger="click"
    >
      <Button
        type="text"
        size="small"
        icon={orderIcon}
      ></Button>
    </Popover>
  )
})