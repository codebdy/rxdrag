import { DeleteOutlined } from "@ant-design/icons";
import { useDeleteScriptLogic } from "UmlEditor/hooks/useDeleteScriptLogic";
import { useMetaId } from "UmlEditor/hooks/useMetaId";
import { MethodMeta } from "UmlEditor/meta";
import { Button } from "antd";
import React, { memo, useCallback } from "react"

export const ScriptLogicAction = memo((
  props: {
    scriptLogic: MethodMeta,
  }
) => {
  const { scriptLogic } = props;
  const metaId = useMetaId();
  const deleteOrches = useDeleteScriptLogic(metaId)

  const handleDelete = useCallback(() => {
    deleteOrches(scriptLogic.uuid)
  }, [deleteOrches, scriptLogic.uuid]);

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
