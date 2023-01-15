import { Button, Modal } from "antd"
import { memo, useCallback, useEffect, useState } from "react"
import { PipeEditor } from "./PipeEditor";



export const FunctionsInput = memo((props: {
  title: string
}) => {
  const { title, ...other } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        footer={false}
        onCancel={handleCancel}
        width={"calc(100vw - 40px)"}
        centered
      >
        <PipeEditor />
      </Modal>
    </>

  )
})