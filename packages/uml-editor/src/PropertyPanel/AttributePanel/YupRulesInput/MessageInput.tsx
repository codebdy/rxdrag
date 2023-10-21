import { EllipsisOutlined } from "@ant-design/icons"
import { IYupConfig } from "@rxdrag/fieldy-yup-validation"
import { useTranslate } from "@rxdrag/react-locales"
import { Button, Input, Popover, Space } from "antd"
import { memo, useCallback, useEffect, useState } from "react"
import styled from "styled-components"

const Content = styled.div`
  width: 280px;
`

const ContentFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
`

export const MessageInput = memo((
  props: {
    value?: IYupConfig<unknown>,
    onChange?: (value?: IYupConfig<unknown>) => void,
  }
) => {
  const { value, onChange } = props;
  const [inputValue, setInputValue] = useState(value)
  const [open, setOpen] = useState(false)
  const t = useTranslate()

  useEffect(() => {
    setInputValue(value)
  }, [value])

  const handleOpenChange = useCallback((open: boolean) => {
    setOpen(open)
  }, [])

  const handleClose = useCallback(() => {
    setInputValue(value)
    setOpen(false)
  }, [value])

  const handleConfirm = useCallback(() => {
    onChange?.(inputValue)
    setOpen(false)
  }, [inputValue, onChange])

  const handleChange = useCallback((event?: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(value => ({ ...value, message: event?.target.value }))
  }, [])

  return (<Popover
    open={open}
    content={
      <Content>
        <Input.TextArea
          rows={4}
          allowClear
          value={inputValue?.message}
          onChange={handleChange}
        />
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