import { MoreOutlined } from "@ant-design/icons";
import { useTranslate } from "@rxdrag/react-locales";
import { Dropdown, Button } from "antd";
import React, { memo, useCallback, useState } from "react"
import { OperateType, IExtensionLogicFlow } from "../../interfaces/extension";
import { useSaveExtensionLogicFlow } from "../../hooks/useSaveExtensionLogicFlow";
import { createId } from "@rxdrag/shared";
import { NameDialog } from "./dialogs/NameDialog";
import { ExtensionDialog } from "./dialogs/ExtensionDialog";

export const LogicFlowRootAction = memo(() => {
  const [codeOpen, setCodeOpen] = useState<boolean>();
  const [dialogTitle, setDialogTitle] = useState("")
  const [tempScript, setTempScript] = useState<IExtensionLogicFlow>()
  const handleNoneAction = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
  }, [])

  const [saveCode, { loading: codeSaving }] = useSaveExtensionLogicFlow({
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

  const handleConfirmScript = useCallback((script: IExtensionLogicFlow) => {
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
            key: 'addLogicQuery',
            onClick: handleAddQuery,
          },
          {
            label: t("AddMutation"),
            key: 'addLogicMutation',
            onClick: handleAddMutation,
          },
          {
            label: t("AddSubLogic"),
            key: 'addSubLogic',
            onClick: () => setCodeOpen(true),
          },
        ]
      }} trigger={['click']}>
        <Button shape='circle' type="text" size='small' onClick={handleNoneAction} icon={<MoreOutlined />}>
        </Button>
      </Dropdown>
      <NameDialog
        title={t("AddSubFlow")}
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
