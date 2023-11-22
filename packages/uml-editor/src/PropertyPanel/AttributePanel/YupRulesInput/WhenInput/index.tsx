import { Button, Form, Modal, Popconfirm } from "antd"
import { memo, useCallback, useEffect, useState } from "react"
import styled, { useTheme } from "styled-components"
import { DepTable } from "./DepTable"
import Editor from "react-monaco-editor"
import { SyncOutlined } from "@ant-design/icons"
import { WhenType } from "@rxdrag/fieldy-yup-validation"
import { useTranslate } from "@rxdrag/react-locales"

const CodeConfig = styled.div`
  display: flex;
  flex-flow: column;
  margin-top: 8px;
`

const CodeTitle = styled.div`
  padding: 8px 0;
  color:${props => props.theme?.token?.colorTextSecondary};
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const CodeContent = styled.div`
  height: 200px;
  border: ${props => props.theme?.token?.colorBorder} solid 1px;
`

const codeTemplate =
  `(#deps#, schema) => {
  //add some code here
  return schema;
}
`

export const WhenInput = memo((
  props: {
    value?: WhenType,
    onChange?: (value?: WhenType) => void
  }
) => {
  const { value, onChange } = props;
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value)
  }, [value])

  const [isModalOpen, setIsModalOpen] = useState(false);
  const t = useTranslate()
  const theme = useTheme();
  const handleShow = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleOk = useCallback(() => {
    onChange?.(inputValue)
    setIsModalOpen(false);
  }, [inputValue, onChange]);

  const handleCancel = useCallback(() => {
    setInputValue(value);
    setIsModalOpen(false);
  }, [value]);

  const handleChange = useCallback((newValue?: string) => {
    setInputValue(value => ({ ...value, body: newValue }))
  }, [])

  const handleRegenerateCode = useCallback(() => {
    setInputValue(value => ({ ...value, body: codeTemplate.replace("#deps#", value?.deps ? "[" + value?.deps?.join(", ") + "]" : "_") }))
  }, [])

  const handleDepsChange = useCallback((deps?: string[]) => {
    setInputValue(value => ({ ...value, deps }))
  }, [])

  return (
    <>
      <Form.Item label={t("validationDep")}>
        <Button onClick={handleShow}>{t("configDep")}</Button>
      </Form.Item>
      <Modal
        title={t("configDep")}
        open={isModalOpen}
        okText={t("confirm")}
        cancelText={t("cancel")}
        width="600px"
        centered
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <DepTable value={inputValue?.deps} onChange={handleDepsChange} />
        <CodeConfig>
          <CodeTitle>
            <span>{t("code")}</span>
            {
              inputValue?.body
                ? <Popconfirm
                  placement="top"
                  title={t("replaceTip")}
                  onConfirm={handleRegenerateCode}
                  okText={t("yes")}
                  cancelText={t("no")}
                >
                  <Button type="text" icon={<SyncOutlined />} />
                </Popconfirm>
                : <Button type="text" icon={<SyncOutlined />} onClick={handleRegenerateCode} />
            }
          </CodeTitle>
          <CodeContent>
            <Editor
              height="100%"
              language="javascript"
              theme={theme.themeMode === "dark" ? "vs-dark" : "vs-light"}
              value={inputValue?.body || ""}
              options={{ lineNumbers: "off", glyphMargin: false }}
              onChange={handleChange}
            /></CodeContent>
        </CodeConfig>
      </Modal>
    </>
  )
})