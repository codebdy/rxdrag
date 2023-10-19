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
          onClick: e => {
            //createCode();
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
