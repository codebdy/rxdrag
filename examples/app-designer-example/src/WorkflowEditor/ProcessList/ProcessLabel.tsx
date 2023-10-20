import React, { useCallback, useState } from "react"
import ProcessActions from "./ProcessActions"
import EditProccessDialog from "./EditProcessDialog"
import { TreeNodeLabel } from "@rxdrag/uml-editor"
import { IProcess, IProcessCategory } from "../../interfaces/process"

const ProcessLabel = (
  props: {
    process: IProcess,
    categories: IProcessCategory[]
  }
) => {
  const { process, categories } = props;
  const [visible, setVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const handleVisableChange = useCallback((visible: boolean) => {
    setVisible(visible)
  }, []);

  const handleEdit = useCallback(() => {
    setModalOpen(true)
  }, [])

  const handleClose = useCallback(() => {
    setModalOpen(false)
  }, [])

  return (
    <TreeNodeLabel fixedAction={visible}
      action={
        <ProcessActions
          pageId={process.id}
          onVisibleChange={handleVisableChange}
          onEdit={handleEdit}
        />
      }>
      {process.name}
      <div
        onClick={e => e.stopPropagation()}
      >
        <EditProccessDialog
          process={process}
          categories={categories}
          isModalVisible={modalOpen}
          onClose={handleClose}
        />
      </div>
    </TreeNodeLabel>
  )
}

export default ProcessLabel