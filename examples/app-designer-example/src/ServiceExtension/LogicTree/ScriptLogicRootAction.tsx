import { MoreOutlined } from "@ant-design/icons";
import { useTranslate } from "@rxdrag/react-locales";
import { Dropdown, Button } from "antd";
import React, { memo, useCallback, useState } from "react"
import { NameDialog } from "./dialogs/NameDialog";

export const ScriptLogicRootAction = memo(() => {
  const [codeOpen, setCodeOpen] = useState<boolean>()
  const handleNoneAction = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
  }, [])

  const t = useTranslate()

  const handleAddCodeClose = useCallback(() => {
    setCodeOpen(false)
  }, [])

  const handleAddCodeConfirm = useCallback(() => {
    setCodeOpen(false)
  }, [])

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
      />
    </>
  )
})
