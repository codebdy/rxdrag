import { MoreOutlined } from "@ant-design/icons";
import { useCreateNewCode } from "UmlEditor/hooks/useCreateNewCode";
import { useCreateNewScriptLogic } from "UmlEditor/hooks/useCreateNewScriptLogic";
import { useMetaId } from "UmlEditor/hooks/useMetaId";
import { MethodOperateType } from "UmlEditor/meta";
import { Dropdown, Button } from "antd";
import React, { memo, useCallback } from "react"
import { useTranslation } from "react-i18next";

export const ScriptLogicRootAction = memo(() => {
  const metaId = useMetaId()
  const { t } = useTranslation();
  const createScriptLogic = useCreateNewScriptLogic(metaId)
  const createCode = useCreateNewCode(metaId)

  const handleNoneAction = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
  }, [])

  return (
    <Dropdown menu={{
      items: [
        {
          label: t("UmlEditor.AddCode"),
          key: '11',
          onClick: e => {
            createCode();
          },
        },
        {
          label: t("UmlEditor.AddQueryScript"),
          key: '12',
          onClick: e => {
            createScriptLogic(MethodOperateType.Query);
          },
        },
        {
          label: t("UmlEditor.AddMutationScript"),
          key: '13',
          onClick: e => {
            createScriptLogic(MethodOperateType.Mutation);
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
