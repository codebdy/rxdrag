import React, { useCallback, useEffect, useState } from "react";
import { memo } from "react";
import { ScriptLogicAction } from "./ScriptLogicAction";
import { IExtendsionScript } from "../../../interfaces/extension";
import { TreeNodeLabel } from "@rxdrag/uml-editor";
import { useRemoveExtensionScript } from "../../../hooks/useRemoveExtensionScript";
import { Button } from "antd";

export const ScriptLogicLabel = memo((
  props: {
    scriptMeta: IExtendsionScript
  }
) => {
  const { scriptMeta } = props;
  const [name, setName] = useState(scriptMeta.name);
  const [confirmOpen, setConfirmOpen] = useState<boolean>()

  const [remove, { loading: removing }] = useRemoveExtensionScript()

  useEffect(() => {
    setName(scriptMeta.name)
  }, [scriptMeta])


  const handleRemove = useCallback(() => {
    remove(scriptMeta.id)
  }, [remove, scriptMeta.id])

  return (
    <TreeNodeLabel
      fixedAction={confirmOpen || removing}
      action={
        <ScriptLogicAction
          onConfirmOpenChange={setConfirmOpen}
          onRemove={handleRemove}
          removing={removing}
        />
      }
    >
      <div>{name}</div>
    </TreeNodeLabel>
  )
})
