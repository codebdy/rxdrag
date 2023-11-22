import { Button, Modal } from "antd"
import { memo, useCallback, useState } from "react"
import styled from "styled-components"
import { JsonView, useSettersTranslate } from "@rxdrag/react-core"
import { jsonIcon } from "@rxdrag/react-shared"

const ContentContainter = styled.div`
  height: calc(100vh - 200px);
`

export const JSONButton = memo(() => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const t = useSettersTranslate()

  const handleShow = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleCancel = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <>
      <Button
        type={"text"}
        size="large"
        icon={jsonIcon}
        onClick={handleShow}
      />
      <Modal
        width={1000}
        centered
        title={t("jsonCode")}
        open={isModalOpen}
        footer={false}
        onCancel={handleCancel}
      >
        <ContentContainter>
          <JsonView />
        </ContentContainter>
      </Modal>
    </>
  )
})