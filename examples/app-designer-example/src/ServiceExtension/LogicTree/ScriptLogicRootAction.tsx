import { MoreOutlined } from "@ant-design/icons";
import { useTranslate } from "@rxdrag/react-locales";
import { Dropdown, Button } from "antd";
import React, { memo, useCallback, useState } from "react"
import { NameDialog } from "./dialogs/NameDialog";
import { useSaveExtensionScript } from "../../hooks/useSaveExtensionScript";
import { createId } from "@rxdrag/shared";
import { ExtensionType } from "../../interfaces/extension";

export const ScriptLogicRootAction = memo(() => {
  const [codeOpen, setCodeOpen] = useState<boolean>()
  const handleNoneAction = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
  }, [])

  const [addCode, { loading: codeSaving }] = useSaveExtensionScript({
    onComplete: () => {
      setCodeOpen(false)
    }
  })

  const t = useTranslate()

  const handleAddCodeClose = useCallback(() => {
    setCodeOpen(false)
  }, [])

  const handleAddCodeConfirm = useCallback((name?: string) => {
    if (name) {
      addCode({
        id: createId(),
        name,
        operateType: ExtensionType.SubMethod
      })
    }
  }, [addCode])

  return (
    <>
      <Dropdown menu={{
        items: [
          {
            label: t("AddQuery"),
            key: 'addQueryScript',
            onClick: e => {
              //createScriptLogic(MethodOperateType.Query);
            },
          },
          {
            label: t("AddMutation"),
            key: 'addMutationScript',
            onClick: e => {
              //createScriptLogic(MethodOperateType.Mutation);
            },
          },
          {
            label: t("AddCode"),
            key: 'addCode',
            onClick: () => setCodeOpen(true),
          },
        ]
      }} trigger={['click']}>
        <Button shape='circle' type="text" size='small' onClick={handleNoneAction}>
          <MoreOutlined />
        </Button>
      </Dropdown>
      <NameDialog
        title={t("AddCode")}
        open={codeOpen}
        onClose={handleAddCodeClose}
        onConfirm={handleAddCodeConfirm}
        saving={codeSaving}
      />
    </>
  )
})
