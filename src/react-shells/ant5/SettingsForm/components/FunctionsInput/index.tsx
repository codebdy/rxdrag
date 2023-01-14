import { Button, Modal } from "antd"
import { useToolsTranslate } from "core-react/hooks/useToolsTranslate";
import { memo, useCallback, useState } from "react"
import styled from "styled-components";

const SytledContent = styled.div`
  height: calc(100vh - 200px);
`

export const FunctionsInput = memo((props: {
  title: string
}) => {
  const { title, ...other } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const t = useToolsTranslate()
  const showModal = useCallback(() => {
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
      <Button {...other} onClick={showModal}>{title}</Button>
      <Modal
        title={title}
        open={isModalOpen}
        mask={false}
        okText={t("confirm")}
        cancelText={t("cancel")}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1199}
        centered
      >
        <SytledContent>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </SytledContent>
      </Modal>
    </>

  )
})