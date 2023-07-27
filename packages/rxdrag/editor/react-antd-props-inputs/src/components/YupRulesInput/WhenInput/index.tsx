import { useSettersTranslate, useThemeMode } from "@rxdrag/react-core"
import { Button, Form, Modal, Popconfirm } from "antd"
import { memo, useCallback, useState } from "react"
import styled from "styled-components"
import { DepTable } from "./DepTable"
import Editor from "@monaco-editor/react"
import { SyncOutlined } from "@ant-design/icons"

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

  const handleConfirm = useCallback(() => {
    //
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
              value={inputValue || ""}
              options={{ lineNumbers: "off", glyphMargin: false }}
              onChange={handleChange}
            /></CodeContent>
        </CodeConfig>
      </Modal>
    </>
  )
})