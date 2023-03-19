import { Cell } from "@antv/x6";
import { useCallback, useEffect } from "react";
import { useGraph } from "./useGraph";

export function useArrowhead() {
  const graph = useGraph()

  const handleMouseEnter = useCallback(({ cell }: { cell: Cell }) => {
    //只能支持到结束节点变换，开始节点暂不支持
    cell.addTools([
      // {
      //   name: "source-arrowhead",
      //   args: {
      //     attrs: {
      //       fill: "transparent",
      //       stroke: "transparent",
      //     },
      //   },
      // },
      {
        name: "target-arrowhead",
        args: {
          attrs: {
            fill: "transparent",
            stroke: "transparent",
          },
        },
      },
    ]);
  }, [])

  const handleMouseLeave = useCallback(({ cell }: { cell: Cell }) => {
    cell.removeTools();
  }, [])

  useEffect(() => {
    graph?.on("edge:mouseenter", handleMouseEnter);
    graph?.on("edge:mouseleave", handleMouseLeave);
    return () => {
      graph?.off("edge:mouseenter", handleMouseEnter);
      graph?.off("edge:mouseleave", handleMouseLeave);
    }
  }, [graph, handleMouseEnter, handleMouseLeave])
}