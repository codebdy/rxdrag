import { DeleteOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React, { memo, useCallback } from "react"
import { IExtensionLogicFlow } from "../../../interfaces/extension";

export const LogicFlowAction = memo((
  props: {
    flowMeta: IExtensionLogicFlow,
  }
) => {
  const { flowMeta } = props;
  // const metaId = useMetaId();
  // const deleteOrches = useDeleteGraphLogic(metaId)

  // const handleDelete = useCallback(() => {
  //   deleteOrches(flowMeta.uuid)
  // }, [deleteOrches, flowMeta.uuid]);

  return (
    <Button
      type="text"
      shape='circle'
      size='small'
      //onClick={handleDelete}
      style={{ color: "inherit" }}
    >
      <DeleteOutlined />
    </Button>
  )
})
