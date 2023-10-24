import { FunctionOutlined } from "@ant-design/icons"
import { useTranslate } from "@rxdrag/react-locales"
import { Badge, Button, Drawer, Space } from "antd"
import { memo, useCallback, useEffect, useState } from "react"
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
    value?: (IExpression | IExpressionGroup)[],
    onChange?: (value?: (IExpression | IExpressionGroup)[]) => void
  }
) => {
  const { entityId, value, onChange } = props;
  const [open, setOpen] = useState<boolean>()
  const [inputValue, setInputValue] = useState<(IExpression | IExpressionGroup)[]>()
  const t = useTranslate()

  useEffect(() => {
    setInputValue(value)
  }, [value])

  const handleOpen = useCallback(() => {
    setOpen(open => !open)
  }, [])

  const handleClose = useCallback(() => {
    setOpen(false)
    setInputValue(value)
  }, [value])

  const handleClear = useCallback(() => {
    setInputValue(undefined)
  }, [])

  const handleConfirm = useCallback(() => {
    onChange?.(inputValue)
    setOpen(false)
  }, [inputValue, onChange])

  return (
    <>
      <Button
        type={open ? "default" : "text"}
        size="small" icon={
          <Badge
            dot
            count={value?.length ? undefined : 0}
            status="processing"
          >
            <FunctionOutlined />
          </Badge>
        }
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
            <Button onClick={handleConfirm} type="primary">
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