import React, { useEffect, useState } from "react";
import { memo } from "react";
import { LogicFlowAction } from "./LogicFlowAction";
import { TreeNodeLabel } from "@rxdrag/uml-editor";
import { IExtensionLogicFlow } from "../../../interfaces/extension";

export const LogicFlowLabel = memo((
  props: {
    flowMeta: IExtensionLogicFlow
  }
) => {
  const { flowMeta } = props;
  const [name, setName] = useState(flowMeta.name);

  useEffect(() => {
    setName(flowMeta.name)
  }, [flowMeta])


  return (
    <TreeNodeLabel
      action={
        <LogicFlowAction flowMeta={flowMeta} />
      }
    >
      <div>{name}</div>
    </TreeNodeLabel>
  )
})
