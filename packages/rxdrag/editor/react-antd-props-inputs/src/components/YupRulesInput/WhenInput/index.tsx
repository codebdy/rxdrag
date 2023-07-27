import { useSettersTranslate, useThemeMode } from "@rxdrag/react-core"
import { Button, Form, Modal, Popconfirm } from "antd"
import { memo, useCallback, useEffect, useState } from "react"
import styled from "styled-components"
import { DepTable } from "./DepTable"
import Editor from "@monaco-editor/react"
import { SyncOutlined } from "@ant-design/icons"
import { WhenType } from "@rxdrag/fieldy-yup-validation"

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

export const WhenInput = memo((
  props: {
    value?: WhenType,
    onChange?: (value: WhenType) => void
  }
) => {
  const { value, onChange } = props;
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value)
  }, [value])

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
    setInputValue(value);
    setIsModalOpen(false);
  }, [value]);

  const handleChange = useCallback((newValue?: string) => {
    setInputValue(value => ({ ...value, body: newValue }))
  }, [])

  const handleConfirm = useCallback(() => {
    //
  }, [])

  const handleDepsChange = useCallback((deps?: string[]) => {
    setInputValue(value => ({ ...value, deps }))
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
        <DepTable value={inputValue?.deps} onChange={handleDepsChange} />
        <CodeConfig>
          <CodeTitle>
            <span>{t("configCode")}</span>
            <Popconfirm
              placement="top"
              title={t("replaceTip")}
              onConfirm={handleConfirm}
              okText={t("yes")}
              cancelText={t("no")}
            >
              <Button type="text" icon={<SyncOutlined />} />
            </Popconfirm>
          </CodeTitle>
          <CodeContent>
            <Editor
              height="100%"
              language="javascript"
              theme={themeMode === "dark" ? "vs-dark" : "vs-light"}
              value={inputValue?.body || ""}
              options={{ lineNumbers: "off", glyphMargin: false }}
              onChange={handleChange}
            /></CodeContent>
        </CodeConfig>
      </Modal>
    </>
  )
})