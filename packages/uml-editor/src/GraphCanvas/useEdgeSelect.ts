import { useCallback, useEffect } from "react";
import { Edge, Graph } from "@antv/x6";
import { useRecoilState, useRecoilValue } from "recoil";
import { drawingLineState, selectedElementState } from "../recoil/atoms";
import { useSelectedRelation } from "../hooks/useSelectedRelation";
import { CONST_CANVAS_CLICK } from "../consts";
import { ID } from "@rxdrag/shared";

export function useEdgeSelect(graph: Graph|undefined, metaId :ID) {
  const drawingLine = useRecoilValue(drawingLineState(metaId));
  const [selectedElement, setSelectedElement] =
    useRecoilState(selectedElementState(metaId));
  const selectedRelation = useSelectedRelation(metaId);

  useEffect(() => {
    if (selectedRelation) {
      const edge = graph?.getCellById(selectedElement || "") as
        | Edge
        | undefined;
      edge?.addTools([
        {
          name: "vertices",
          args: {
            stopPropagation: false,
          },
        },
        {
          name: "boundary",
          args: {
            padding: 5,
            attrs: {
              //fill: "#7c68fc",
              //stroke: theme.palette.text.primary,
              strokeWidth: 0.5,
              fillOpacity: 0,
            },
          },
        },
        {
          name: "segments",
          args: {
            stopPropagation: false,
          },
        },
      ]);
    }
    graph?.getEdges().forEach((edge) => {
      if (selectedElement !== edge.id) {
        edge.removeTools([
          "boundary",
          {
            name: "vertices",
            args: {
              stopPropagation: false,
            },
          },
          {
            name: "segments",
            args: {
              stopPropagation: false,
            },
          },
        ]);
      }
    });
  }, [graph, selectedElement, selectedRelation ]);

  const handleBlankClick = useCallback(() => {
    const clickEnvent = new CustomEvent(CONST_CANVAS_CLICK);
    document.dispatchEvent(clickEnvent)
    setSelectedElement(undefined);
  }, [setSelectedElement]);

  const handleEdgeClick = useCallback(
    (arg: { edge: Edge<Edge.Properties> }) => {
      const { edge } = arg;
      if (edge && edge.id !== drawingLine?.tempEdgeId) {
        setSelectedElement(edge.id);
      }
    },
    [drawingLine?.tempEdgeId, setSelectedElement]
  );

  useEffect(() => {
    graph?.on("blank:click", handleBlankClick);
    graph?.on("edge:click", handleEdgeClick);
    return () => {
      graph?.off("blank:click", handleBlankClick);
      graph?.off("edge:click", handleEdgeClick);
    };
  }, [graph, handleBlankClick, handleEdgeClick]);
}
