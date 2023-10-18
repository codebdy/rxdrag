import React, { useEffect } from "react";
import { Dnd } from "@antv/x6-plugin-dnd";
import { Graph } from "@antv/x6";


export function useDnd(graph: Graph|undefined) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [dnd, setDnd] = React.useState<any>()
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