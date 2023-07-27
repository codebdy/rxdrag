import { useSettersTranslate, useThemeMode } from "@rxdrag/react-core"
import { Button, Form, Modal } from "antd"
import { memo, useCallback, useState } from "react"
import styled from "styled-components"
import { DepTable } from "./DepTable"
import Editor from "@monaco-editor/react"

const CodeConfig = styled.div`
  display: flex;
  flex-flow: column;
  margin-top: 8px;
`

const CodeTitle = styled.div`
  padding: 8px 0;
  color:${props => props.theme?.token?.colorTextSecondary};
`

const CodeContent = styled.div`
  height: 200px;
  border: ${props => props.theme?.token?.colorBorder} solid 1px;
`

export const WhenInput = memo(() => {
  const [inputValue, setInputValue] = useState<string>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const t = useSettersTranslate()
  const themeMode = useThemeMode();
  const handleShow = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleOk = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleCancel = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleChange = useCallback((newValue?: string) => {
    setInputValue(newValue)
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
        <DepTable />
        <CodeConfig>
          <CodeTitle>
            {t("configCode")}
          </CodeTitle>
          <CodeContent>
            <Editor
              height="100%"
              language="javascript"
              theme={themeMode === "dark" ? "vs-dark" : "vs-light"}
              value={inputValue || ""}
              options={{ lineNumbers: "off", glyphMargin: false }}
              onChange={handleChange}
            /></CodeContent>
        </CodeConfig>
      </Modal>
    </>
  )
})