import { Button, Form, Input, Modal, Popconfirm } from "antd"
import { memo, useCallback, useEffect, useState } from "react"
import styled, { useTheme } from "styled-components"
import Editor from "react-monaco-editor"
import { TestType } from "@rxdrag/fieldy-yup-validation"
import { SyncOutlined } from "@ant-design/icons"
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
  height: 260px;
  border: ${props => props.theme?.token?.colorBorder} solid 1px;
`

const codeTemplate =
  `(value, context) => {
  //add some code here
  return value==="some code";
}
`

export const TestInput = memo((
  props: {
    value?: TestType,
    onChange?: (value?: TestType) => void
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
    setInputValue(value => ({ ...value, test: newValue }))
  }, [])

  const handleRegenerateCode = useCallback(() => {
    setInputValue(value => ({ ...value, test: codeTemplate }))
  }, [])

  const handleMessageChange = useCallback((e?: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(value => ({ ...value, message: e?.target.value }))
  }, [])

  return (
    <>
      <Form.Item label={t("customized")}>
        <Button onClick={handleShow}>{t("configRules")}</Button>
      </Form.Item>
      <Modal
        title={t("configRules")}
        open={isModalOpen}
        okText={t("confirm")}
        cancelText={t("cancel")}
        width="600px"
        centered
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <CodeTitle>
          {t("message")}
        </CodeTitle>
        <Input.TextArea value={inputValue?.message} onChange={handleMessageChange} />
        <CodeConfig>
          <CodeTitle>
            <span>{t("code")}</span>
            {
              inputValue?.test
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
              theme={theme?.themeMode === "dark" ? "vs-dark" : "vs-light"}
              value={inputValue?.test || ""}
              options={{ lineNumbers: "off", glyphMargin: false }}
              onChange={handleChange}
            /></CodeContent>
        </CodeConfig>
      </Modal>
    </>
  )
})