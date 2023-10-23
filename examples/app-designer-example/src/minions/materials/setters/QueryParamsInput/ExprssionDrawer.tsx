import { FunctionOutlined } from "@ant-design/icons"
import { useTranslate } from "@rxdrag/react-locales"
import { Button, Drawer, Space } from "antd"
import { memo, useCallback, useState } from "react"
import { Footer } from "./Footer"

export const ExprssionDrawer = memo(() => {
  const [open, setOpen] = useState<boolean>()
  const t = useTranslate()
  const handleOpen = useCallback(() => {
    setOpen(open => !open)
  }, [])

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [])

  return (
    <>
      <Button
        type={open ? "default" : "text"}
        size="small" icon={<FunctionOutlined />}
        onClick={handleOpen}
      ></Button>
      <Drawer title={t("configExpression")}
        placement="right"
        width={"50%"}
        onClose={handleClose}
        mask={false}
        open={open}
        footer={<Footer>
          <Button>{t("clear")}</Button>
          <Space>
            <Button onClick={handleClose}>{t("cancel")}</Button>
            <Button onClick={handleClose} type="primary">
              {t("confirm")}
            </Button>
          </Space>
        </Footer>}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  )
})