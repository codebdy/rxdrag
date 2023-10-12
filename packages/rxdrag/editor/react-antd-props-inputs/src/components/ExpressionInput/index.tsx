import { DeleteOutlined, FunctionOutlined } from "@ant-design/icons"
import Editor from 'react-monaco-editor';
import { useThemeMode, useSettersTranslate } from "@rxdrag/react-core";
import { Button, Drawer, Space } from "antd"
import { memo, useCallback, useEffect, useMemo, useState } from "react"
import styled from "styled-components";
import { isString } from "lodash";

const StyledDrawer = styled(Drawer)`
  .ant-drawer-body{
    padding: 12px 0 12px 0;
  }
`

export const ExpressionInput = memo((props: {
  value?: string,
  onChange?: (value?: string) => void,
}) => {
  const { value, onChange, ...other } = props;
  const [inputValue, setInputValue] = useState<string>();
  const [open, setOpen] = useState(false);
  const t = useSettersTranslate()
  const themeMode = useThemeMode();
  console.log("====>value", value)
  const isExp = useMemo(() => {
    return isString(value) && value.trim().startsWith("{{") && value.trim().endsWith("}}")
  }, [value])

  useEffect(() => {
    setInputValue(value)
  }, [value])

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setInputValue(value);
    setOpen(false);
  }, [value]);

  const handleChange = useCallback((newValue?: string) => {
    setInputValue(newValue)
  }, [])

  const handleConfirm = useCallback(() => {
    onChange?.(inputValue)
    setOpen(false);
  }, [inputValue, onChange])

  const handleClear = useCallback(() => {
    if (inputValue) {
      onChange?.(undefined)
      setInputValue(undefined)
      setOpen(false);
    }
  }, [inputValue, onChange])

  return (
    <>
      <Button type={isExp ? "link" : "text"} icon={<FunctionOutlined />} onClick={handleOpen} {...other} />
      <StyledDrawer
        title={t("ExpressionInput.DialogTitle")}
        width={500}
        mask={false}
        placement="right"
        onClose={handleClose}
        open={open}
        extra={
          <Space>
            <Button
              disabled={!inputValue}
              icon={<DeleteOutlined />}
              onClick={handleClear}
            >
              {t("clear")}
            </Button>
            <Button onClick={handleClose}>{t("cancel")}</Button>
            <Button type="primary" onClick={handleConfirm}>
              {t("confirm")}
            </Button>
          </Space>
        }
      >
        <Editor
          height="100%"
          language="javascript"
          theme={themeMode === "dark" ? "vs-dark" : "vs-light"}
          value={inputValue || ""}
          options={{ lineNumbers: "off", glyphMargin: false }}
          onChange={handleChange}
        />
      </StyledDrawer>
    </>
  )
})

ExpressionInput.displayName = "ExpressionInput"