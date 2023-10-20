import { Graph } from "@antv/x6";
import { useCallback, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { drawingLineState } from "../recoil/atoms";
import { ID } from "@rxdrag/shared";
export const HOVER_COLOR = "rgba(115,103,240,0.3)";

export function useEdgeHover(graph: Graph | undefined, metaId: ID) {
  const drawingLine = useRecoilValue(drawingLineState(metaId));

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEdgeMouseEnter = useCallback(({ edge }: any) => {
    if (edge && drawingLine?.tempEdgeId !== edge.id) {
      edge.attr({
        line: {
          strokeWidth: 2,
        },
      });
    }
  }, [drawingLine?.tempEdgeId]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
