import React, { useEffect, useState } from "react";
import { memo } from "react";
import { ScriptLogicAction } from "./ScriptLogicAction";
import { MethodMeta } from "UmlEditor/meta";
import TreeNodeLabel from "common/TreeNodeLabel";

export const ScriptLogicLabel = memo((
  props: {
    scriptMeta: MethodMeta
  }
) => {
  const { scriptMeta } = props;
  const [name, setName] = useState(scriptMeta.name);

  useEffect(() => {
    setName(scriptMeta.name)
  }, [scriptMeta])


  return (
    <TreeNodeLabel
      action={
        <ScriptLogicAction scriptLogic={scriptMeta} />
      }
    >
      <div>{name}</div>
    </TreeNodeLabel>
  )
})
