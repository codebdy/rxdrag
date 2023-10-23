import { FunctionOutlined } from "@ant-design/icons"
import { useTranslate } from "@rxdrag/react-locales"
import { Button, Drawer, Space } from "antd"
import { memo, useCallback, useState } from "react"
import { Footer } from "./Footer"
import { ExpressionTreeInput } from "./ExpressionInput"
import { IExpression, IExpressionGroup } from "../../../activities/common/interfaces"
import styled from "styled-components"

const StyledDrawer = styled(Drawer)`
  .ant-drawer-body{
    padding: 8px 16px;
  }
`

export const ExprssionDrawer = memo((
  props: {
    entityId: string,
  }
) => {
  const { entityId } = props;
  const [open, setOpen] = useState<boolean>()
  const [inputValue, setInputValue] = useState<(IExpression | IExpressionGroup)[]>()
  const t = useTranslate()
  const handleOpen = useCallback(() => {
    setOpen(open => !open)
  }, [])

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [])

  const handleClear = useCallback(() => {
    setInputValue(undefined)
  }, [])

  return (
    <>
      <Button
        type={open ? "default" : "text"}
        size="small" icon={<FunctionOutlined />}
        onClick={handleOpen}
      ></Button>
      <StyledDrawer title={t("configExpression")}
        placement="right"
        width={"50%"}
        onClose={handleClose}
        mask={false}
        open={open}
        footer={<Footer>
          <Button
            onClick={handleClear}
          >{t("clear")}</Button>
          <Space>
            <Button onClick={handleClose}>{t("cancel")}</Button>
            <Button onClick={handleClose} type="primary">
              {t("confirm")}
            </Button>
          </Space>
        </Footer>}
      >
        <ExpressionTreeInput
          entityId={entityId}
          value={inputValue}
          onChange={setInputValue}
        />
      </StyledDrawer>
    </>
  )
})