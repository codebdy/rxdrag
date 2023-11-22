import { useCallback, useState } from "react";
import { memo } from "react";
import { ExtensionAction } from "../ExtensionAction";
import { TreeNodeLabel } from "@rxdrag/uml-editor";
import { ExtensionDialog } from "../dialogs/ExtensionDialog";
import { useTranslate } from "@rxdrag/react-locales";
import { IExtensionLogicFlow } from "../../../interfaces/extension";
import { useRemoveExtensionLogicFlow } from "../../../hooks/useRemoveExtensionLogicFlow";
import { useSaveExtensionLogicFlow } from "../../../hooks/useSaveExtensionLogicFlow";

export const LogicFlowLabel = memo((
  props: {
    flowMeta: IExtensionLogicFlow
  }
) => {
  const { flowMeta } = props;
  const [openEdit, setOpenEdit] = useState<boolean>()
  const [confirmOpen, setConfirmOpen] = useState<boolean>()
  const t = useTranslate()

  const [remove, { loading: removing }] = useRemoveExtensionLogicFlow()
  const [save, { loading: saving }] = useSaveExtensionLogicFlow(
    {
      onComplete: () => {
        setOpenEdit(false)
      }
    }
  )

  const handleRemove = useCallback(() => {
    remove(flowMeta.id)
  }, [remove, flowMeta.id])

  const handleEditClose = useCallback(() => {
    setOpenEdit(false)
  }, [])

  const handleEditConfirm = useCallback((newScipt: IExtensionLogicFlow) => {
    save({ ...flowMeta, ...newScipt })
  }, [save, flowMeta])

  const handleEdit = useCallback(() => {
    setOpenEdit(true)
  }, [])

  return (
    <>
      <TreeNodeLabel
        fixedAction={confirmOpen || removing}
        action={
          <ExtensionAction
            onConfirmOpenChange={setConfirmOpen}
            onRemove={handleRemove}
            removing={removing}
            onEdit={handleEdit}
          />
        }
      >
        <div>{flowMeta.name}</div>
      </TreeNodeLabel>
      {openEdit && <ExtensionDialog
        extension={flowMeta}
        saving={saving}
        open={openEdit}
        title={t("EditLogicFlow")}
        onClose={handleEditClose}
        onConfirm={handleEditConfirm}
      />}
    </>
  )
})
