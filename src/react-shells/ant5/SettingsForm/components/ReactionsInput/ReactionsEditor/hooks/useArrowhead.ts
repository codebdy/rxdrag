import { Cell } from "@antv/x6";
import { useCallback, useEffect } from "react";
import { useEditorState } from "./useEditorState";

export function useArrowhead() {
  const { graph, dispatch } = useEditorState()

  const handleMouseEnter = useCallback(({ cell }: { cell: Cell }) => {
    cell.addTools([
      {
        name: "source-arrowhead",
        args: {
          attrs: {
            fill: "transparent",
            stroke: "transparent",
          },
        },
      },
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