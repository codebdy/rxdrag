import { Button, Modal } from "antd"
import { useToolsTranslate } from "core-react/hooks/useToolsTranslate";
import { memo, useCallback, useEffect, useState } from "react"
import { ReactionsEditor } from "./ReactionsEditor";

export const ReactionsInput = memo((props: {
  title: string
}) => {
  const { title, ...other } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const t = useToolsTranslate()

  const showModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleCancel = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  useEffect(() => {

  }, [])

  return (
    <>
      <Button {...other} onClick={showModal}>{title}</Button>
      <Modal
        title={title}
        open={isModalOpen}
        cancelText={t("cancel")}
        okText = {t("confirm")}
        onCancel={handleCancel}
        width={"calc(100vw - 40px)"}
        centered
      >
        <ReactionsEditor />
      </Modal>
    </>

  )
})