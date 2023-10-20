import React, { useCallback, useState } from "react";
import { memo } from "react";
import { ExtensionAction } from "../ExtensionAction";
import { IExtendsionScript } from "../../../interfaces/extension";
import { TreeNodeLabel } from "@rxdrag/uml-editor";
import { useRemoveExtensionScript } from "../../../hooks/useRemoveExtensionScript";
import { ExtensionDialog } from "../dialogs/ExtensionDialog";
import { useTranslate } from "@rxdrag/react-locales";
import { useSaveExtensionScript } from "../../../hooks/useSaveExtensionScript";

export const ScriptLogicLabel = memo((
  props: {
    scriptMeta: IExtendsionScript
  }
) => {
  const { scriptMeta } = props;
  const [openEdit, setOpenEdit] = useState<boolean>()
  const [confirmOpen, setConfirmOpen] = useState<boolean>()
  const t = useTranslate()

  const [remove, { loading: removing }] = useRemoveExtensionScript()
  const [save, { loading: saving }] = useSaveExtensionScript(
    {
      onComplete: () => {
        setOpenEdit(false)
      }
    }
  )


  const handleRemove = useCallback(() => {
    remove(scriptMeta.id)
  }, [remove, scriptMeta.id])

  const handleEditClose = useCallback(() => {
    setOpenEdit(false)
  }, [])

  const handleEditConfirm = useCallback((newScipt: IExtendsionScript) => {
    save({ ...scriptMeta, ...newScipt })
  }, [save, scriptMeta])

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
        <div>{scriptMeta.name}</div>
      </TreeNodeLabel>
      {openEdit && <ExtensionDialog
        extension={scriptMeta}
        saving={saving}
        open={openEdit}
        title={t("EditScript")}
        onClose={handleEditClose}
        onConfirm={handleEditConfirm}
      />}
    </>
  )
})
