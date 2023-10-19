import { DeleteOutlined } from "@ant-design/icons";
import { useDeleteGraphLogic } from "UmlEditor/hooks/useDeleteGraphLogic";
import { useMetaId } from "UmlEditor/hooks/useMetaId";
import { MethodMeta } from "UmlEditor/meta";
import { Button } from "antd";
import React, { memo, useCallback } from "react"

export const GraphLogicAction = memo((
  props: {
    graphLogic: MethodMeta,
  }
) => {
  const { graphLogic } = props;
  const metaId = useMetaId();
  const deleteOrches = useDeleteGraphLogic(metaId)

  const handleDelete = useCallback(() => {
    deleteOrches(graphLogic.uuid)
  }, [deleteOrches, graphLogic.uuid]);

  return (
    <Button
      type="text"
      shape='circle'
      size='small'
      onClick={handleDelete}
      style={{ color: "inherit" }}
    >
      <DeleteOutlined />
    </Button>
  )
})
