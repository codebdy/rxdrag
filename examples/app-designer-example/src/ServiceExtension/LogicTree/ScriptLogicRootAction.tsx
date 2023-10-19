import { MoreOutlined } from "@ant-design/icons";
import { useTranslate } from "@rxdrag/react-locales";
import { Dropdown, Button } from "antd";
import React, { memo, useCallback, useState } from "react"
import { NameDialog } from "./dialogs/NameDialog";
import { useSaveExtensionScript } from "../../hooks/useSaveExtensionScript";
import { createId } from "@rxdrag/shared";
import { OperateType, IExtendsionScript } from "../../interfaces/extension";
import { ExtensionDialog } from "./dialogs/ExtensionDialog";

export const ScriptLogicRootAction = memo(() => {
  const [codeOpen, setCodeOpen] = useState<boolean>();
  const [dialogTitle, setDialogTitle] = useState("")
  const [tempScript, setTempScript] = useState<IExtendsionScript>()
  const handleNoneAction = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
  }, [])

  const [saveCode, { loading: codeSaving }] = useSaveExtensionScript({
    onComplete: () => {
      setCodeOpen(false)
      setTempScript(undefined)
    }
  })

  const t = useTranslate()

  const handleAddCodeClose = useCallback(() => {
    setCodeOpen(false)
  }, [])

  const handleAddCodeConfirm = useCallback((name?: string) => {
    if (name) {
      saveCode({
        id: createId(),
        name,
        operateType: OperateType.SubMethod,
        belongsTo: { id: "app1" }
      })
    }
  }, [saveCode])

  const handleAddQuery = useCallback(() => {
    setDialogTitle(t("AddQuery"))
    setTempScript({
      id: createId(),
      name: "",
      operateType: OperateType.Query,
      belongsTo: { id: "app1" }
    })
  }, [t])

  const handleAddMutation = useCallback(() => {
    setDialogTitle(t("AddMutation"))
    setTempScript({
      id: createId(),
      name: "",
      operateType: OperateType.Mutation,
      belongsTo: { id: "app1" }
    })
  }, [t])

  const handleScriptClose = useCallback(() => {
    setTempScript(undefined)
  }, [])

  const handleConfirmScript = useCallback((script: IExtendsionScript) => {
    saveCode({
      ...tempScript,
      ...script,
    })
  }, [saveCode, tempScript])

  return (
    <>
      <Dropdown menu={{
        items: [
          {
            label: t("AddQuery"),
            key: 'addQueryScript',
            onClick: handleAddQuery,
          },
          {
            label: t("AddMutation"),
            key: 'addMutationScript',
            onClick: handleAddMutation,
          },
          {
            label: t("AddCode"),
            key: 'addCode',
            onClick: () => setCodeOpen(true),
          },
        ]
      }} trigger={['click']}>
        <Button
          shape='circle'
          type="text"
          size='small'
          onClick={handleNoneAction}
          icon={<MoreOutlined />}
        >
        </Button>
      </Dropdown>
      <NameDialog
        title={t("AddCode")}
        open={codeOpen}
        onClose={handleAddCodeClose}
        onConfirm={handleAddCodeConfirm}
        saving={codeSaving}
      />
      <ExtensionDialog
        open={!!tempScript}
        title={dialogTitle}
        extension={tempScript}
        onClose={handleScriptClose}
        onConfirm={handleConfirmScript}
        saving={codeSaving}
      />
    </>
  )
})
