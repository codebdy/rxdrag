import React, { useEffect } from "react";
import { useEditorStore } from "./useEditorStore";
import { Dnd } from "@antv/x6-plugin-dnd";

export function useDnd() {
  const [dnd, setDnd] = React.useState<any>()
  const { graph } = useEditorStore()
  useEffect(() => {
    const theDnd = graph
      ? new Dnd({
        target: graph,
        scaled: false,
      })
      : undefined;
    setDnd(theDnd);
  }, [graph]);

  return dnd
}