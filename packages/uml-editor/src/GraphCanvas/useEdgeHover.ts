import { Graph } from "@antv/x6";
import { useCallback, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { ID } from "shared";
import { drawingLineState } from "../recoil/atoms";
export const HOVER_COLOR = "rgba(115,103,240,0.3)";

export function useEdgeHover(graph: Graph | undefined, metaId: ID) {
  const drawingLine = useRecoilValue(drawingLineState(metaId));

  const handleEdgeMouseEnter = useCallback(({ edge }: any) => {
    if (edge && drawingLine?.tempEdgeId !== edge.id) {
      edge.attr({
        line: {
          strokeWidth: 2,
        },
      });
    }
  }, [drawingLine?.tempEdgeId]);

  const handleEdgeMouseLeave = useCallback(({ edge }: any) => {
    if (edge) {
      edge.attr({
        line: {
          strokeWidth: 1,
        },
      });
    }
  }, []);

  useEffect(() => {
    graph?.on("edge:mouseenter", handleEdgeMouseEnter);
    graph?.on("edge:mouseleave", handleEdgeMouseLeave);
    return () => {
      graph?.off("edge:mouseenter", handleEdgeMouseEnter);
      graph?.off("edge:mouseleave", handleEdgeMouseLeave);
    };
  }, [graph, handleEdgeMouseEnter, handleEdgeMouseLeave]);
}
