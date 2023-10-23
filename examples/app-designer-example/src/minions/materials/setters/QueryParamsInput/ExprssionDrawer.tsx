import { FunctionOutlined } from "@ant-design/icons"
import { useTranslate } from "@rxdrag/react-locales"
import { Button, Drawer } from "antd"
import { memo, useCallback, useState } from "react"

export const ExprssionDrawer = memo(() => {
  const [open, setOpen] = useState<boolean>()
  const t = useTranslate()
  const handleOpen = useCallback(() => {
    setOpen(true)
  }, [])

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [])

  return (
    <>
      <Button
        type="text"
        size="small" icon={<FunctionOutlined />}
        onClick={handleOpen}
      ></Button>
      <Drawer title={t("configExpression")}
        placement="right"
        width={"50%"}
        onClose={handleClose}
        mask={false}
        open={open}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  )
})