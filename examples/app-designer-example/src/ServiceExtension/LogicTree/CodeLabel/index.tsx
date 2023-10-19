import React, { useEffect, useState } from "react";
import { memo } from "react";
import { CodeAction } from "./CodeAction";
import { IExtendsionScript } from "../../../interfaces/extension";
import { TreeNodeLabel } from "@rxdrag/uml-editor";

export const CodeLabel = memo((
  props: {
    codeMeta: IExtendsionScript
  }
) => {
  const { codeMeta } = props;
  const [name, setName] = useState(codeMeta.name);

  useEffect(() => {
    setName(codeMeta.name)
  }, [codeMeta])


  return (
    <TreeNodeLabel
      action={
        <CodeAction code={codeMeta} />
      }
    >
      <div>{name}</div>
    </TreeNodeLabel>
  )
})
