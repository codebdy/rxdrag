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
          label: t("AddQuery"),
          key: 'addLogicQuery',
          onClick: e => {
            //addGraphLogic(MethodOperateType.Query);
          },
        },
        {
          label: t("AddMutation"),
          key: 'addLogicMutation',
          onClick: e => {
            //addGraphLogic(MethodOperateType.Mutation);
          },
        },
        {
          label: t("AddSubLogic"),
          key: 'addSubLogic',
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
