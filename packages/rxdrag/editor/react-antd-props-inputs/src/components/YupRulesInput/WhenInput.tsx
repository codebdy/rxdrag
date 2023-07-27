import { useSettersTranslate } from "@rxdrag/react-core"
import { Button, Form, Modal } from "antd"
import { memo, useCallback, useState } from "react"
import styled from "styled-components"
import DepTable from "./DepTable"

const Content = styled.div`
  display: flex;
  flex-flow: column;
`

export const WhenInput = memo(() => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const t = useSettersTranslate()
  const handleShow = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleOk = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleCancel = useCallback(() => {
    setIsModalOpen(false);
  }, []);

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
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <DepTable />
        <div>
          配置代码
        </div>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  )
})