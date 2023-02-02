import React, { useEffect } from "react";
import { Dnd } from "@antv/x6-plugin-dnd";
import { useGraph } from "./useGraph";

export function useDnd() {
  const [dnd, setDnd] = React.useState<any>()
  const graph = useGraph()
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