import React, { useCallback, useEffect, useState } from "react";
import { memo } from "react";
import { ScriptLogicAction } from "./ScriptLogicAction";
import { IExtendsionScript } from "../../../interfaces/extension";
import { TreeNodeLabel } from "@rxdrag/uml-editor";
import { useRemoveExtensionScript } from "../../../hooks/useRemoveExtensionScript";
import { ScriptDialog } from "../dialogs/ScriptDialog";
import { useTranslate } from "@rxdrag/react-locales";
import { useSaveExtensionScript } from "../../../hooks/useSaveExtensionScript";

export const ScriptLogicLabel = memo((
  props: {
    scriptMeta: IExtendsionScript
  }
) => {
  const { scriptMeta } = props;
  const [openEdit, setOpenEdit] = useState<boolean>()
  const [name, setName] = useState(scriptMeta.name);
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

  useEffect(() => {
    setName(scriptMeta.name)
  }, [scriptMeta])


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
          <ScriptLogicAction
            onConfirmOpenChange={setConfirmOpen}
            onRemove={handleRemove}
            removing={removing}
            onEdit={handleEdit}
          />
        }
      >
        <div>{name}</div>
      </TreeNodeLabel>
      {openEdit && <ScriptDialog
        script={scriptMeta}
        saving={saving}
        open={openEdit}
        title={t("EditScript")}
        onClose={handleEditClose}
        onConfirm={handleEditConfirm}
      />}
    </>
  )
})
