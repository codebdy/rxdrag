import { MoreOutlined } from "@ant-design/icons";
import { useTranslate } from "@rxdrag/react-locales";
import { Dropdown, Button } from "antd";
import React, { memo, useCallback } from "react"

export const ScriptLogicRootAction = memo(() => {
  const handleNoneAction = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
  }, [])

  const t = useTranslate()

  return (
    <Dropdown menu={{
      items: [
        {
          label: t("UmlEditor.AddCode"),
          key: '11',
          onClick: e => {
            //createCode();
          },
        },
        {
          label: t("UmlEditor.AddQueryScript"),
          key: '12',
          onClick: e => {
            //createScriptLogic(MethodOperateType.Query);
          },
        },
        {
          label: t("UmlEditor.AddMutationScript"),
          key: '13',
          onClick: e => {
            //createScriptLogic(MethodOperateType.Mutation);
          },
        },
      ]
    }} trigger={['click']}>
      <Button shape='circle' type="text" size='small' onClick={handleNoneAction}>
        <MoreOutlined />
      </Button>
    </Dropdown>
  )
})
