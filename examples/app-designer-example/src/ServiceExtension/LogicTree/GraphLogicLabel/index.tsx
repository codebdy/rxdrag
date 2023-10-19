import React, { useEffect, useState } from "react";
import { memo } from "react";
import { GraphLogicAction } from "./GraphLogicAction";
import { MethodMeta } from "UmlEditor/meta";
import TreeNodeLabel from "common/TreeNodeLabel";

export const GraphLogicLabel = memo((
  props: {
    graphLogicMeta: MethodMeta
  }
) => {
  const { graphLogicMeta } = props;
  const [name, setName] = useState(graphLogicMeta.name);

  useEffect(() => {
    setName(graphLogicMeta.name)
  }, [graphLogicMeta])


  return (
    <TreeNodeLabel
      action={
        <GraphLogicAction graphLogic={graphLogicMeta} />
      }
    >
      <div>{name}</div>
    </TreeNodeLabel>
  )
})
