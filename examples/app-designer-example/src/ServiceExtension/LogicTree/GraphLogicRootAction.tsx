import { MoreOutlined } from "@ant-design/icons";
import { useTranslate } from "@rxdrag/react-locales";
import { Dropdown, Button } from "antd";
import React, { memo, useCallback } from "react"

export const GraphLogicRootAction = memo(() => {

  const t = useTranslate();
  // const metaId = useMetaId()
  // const addGraphLogic = useCreateNewGraphLogic(metaId)

  const handleNoneAction = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
  }, [])

  return (
    <Dropdown menu={{
      items: [
        {
          label: t("UmlEditor.AddQueryGraph"),
          key: 'query',
          onClick: e => {
            //addGraphLogic(MethodOperateType.Query);
          },
        },
        {
          label: t("UmlEditor.AddMutationGraph"),
          key: 'mutation',
          onClick: e => {
            //addGraphLogic(MethodOperateType.Mutation);
          },
        },
        {
          label: t("UmlEditor.AddSubLogic"),
          key: 'submethod',
          onClick: e => {
            //addGraphLogic(MethodOperateType.SubMethod);
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
