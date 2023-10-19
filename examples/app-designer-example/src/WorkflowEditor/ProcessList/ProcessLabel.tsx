import TreeNodeLabel from "common/TreeNodeLabel"
import React, { useCallback, useState } from "react"
import { IProcess, IProcessCategory } from "model"
import ProcessActions from "./ProcessActions"
import EditProccessDialog from "./EditProcessDialog"
import { useParseLangMessage } from "plugin-sdk/hooks/useParseLangMessage"

const ProcessLabel = (
  props: {
    process: IProcess,
    categories: IProcessCategory[]
  }
) => {
  const { process, categories } = props;
  const [visible, setVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const p = useParseLangMessage();
  const handleVisableChange = useCallback((visible:boolean) => {
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
      {p(process.name)}
      <div
        onClick={e => e.stopPropagation()}
      >
        <EditProccessDialog process={process} categories={categories} isModalVisible={modalOpen} onClose={handleClose} />
      </div>
    </TreeNodeLabel>
  )
}

export default ProcessLabel