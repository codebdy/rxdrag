import { Edge, Graph } from "@antv/x6";
import { useEffect } from "react";
import { getRelationGraphAttrs } from "./getRelationGraphAttrs";
import _ from "lodash";
import {
  MULTI_SOURCE_POSITION_CONST,
  MULTI_SOURCE_TARGET_CONST,
  ROLE_SOURCE_POSITION_CONST,
  ROLE_SOURCE_TARGET_CONST,
} from "./constLabelPosition";
import { useRecoilValue } from "recoil";
import {
  drawingLineState,
  selectedUmlDiagramState,
  selectedElementState,
} from "../recoil/atoms";
import { EdgeConfig, useDiagramEdges } from "../hooks/useDiagramEdges";
import { GlobalToken } from "antd/es/theme/interface";
import { useToken } from "antd/es/theme/internal";
import { ID } from "@rxdrag/shared";
import { RelationType } from "@rxdrag/uml-schema";

export function useEdgesShow(graph: Graph | undefined, metaId: ID) {
  const selectedDiagram = useRecoilValue(selectedUmlDiagramState(metaId));
  const selectedElement = useRecoilValue(selectedElementState(metaId));
  const drawingLine = useRecoilValue(drawingLineState(metaId));
  const [, token] = useToken();
  const edges = useDiagramEdges(selectedDiagram || "", metaId);

  useEffect(() => {
    edges?.forEach((edgeMeta) => {
      let grahpEdge = graph?.getCellById(edgeMeta.id) as
        | Edge<Edge.Properties>
        | undefined;
      if (grahpEdge) {
        if (
          !_.isEqual(grahpEdge.getVertices(), edgeMeta.vertices) &&
          edgeMeta.vertices
        ) {
          grahpEdge.setVertices(edgeMeta.vertices);
        }

        if (grahpEdge.data.relationType !== edgeMeta.relationType) {
          // grahpEdge.setData({ relationType: edgeMeta.relationType });
          // grahpEdge.setAttrs(
          //   getRelationGraphAttrs(edgeMeta.relationType)
          // );
          grahpEdge.remove();
          grahpEdge = addNewEdge(graph, edgeMeta, selectedElement, token);
        }
      } else {
        grahpEdge = addNewEdge(graph, edgeMeta, selectedElement, token);
      }

      //如果是跟自己连接，那么需要增加2个中间点
      if (
        edgeMeta.sourceId === edgeMeta.targetId &&
        (!edgeMeta.vertices || edgeMeta.vertices?.length === 0)
      ) {
        grahpEdge?.appendVertex({
          x: grahpEdge?.getTargetPoint().x + 200,
          y: grahpEdge?.getTargetPoint().y - 150,
        });
        grahpEdge?.appendVertex({
          x: grahpEdge?.getTargetPoint().x + 200,
          y: grahpEdge?.getTargetPoint().y,
        });
      }

      if (edgeMeta.relationType !== RelationType.INHERIT) {
        grahpEdge?.setLabels([
          {
            attrs: {
              text: {
                text: edgeMeta.roleOfSource || "",
                fill: token.colorText,
              },
              rect: {
                fill: "transparent",
              },
            },
            position:
              edgeMeta.roleOnSourcePosition || ROLE_SOURCE_POSITION_CONST,
          },
          {
            attrs: {
              text: {
                text: edgeMeta.sourceMutiplicity,
                fill: token.colorText,
              },
              rect: {
                fill: "transparent",
              },
            },
            position:
              edgeMeta.sourceMultiplicityPosition || MULTI_SOURCE_POSITION_CONST,
          },
          {
            attrs: {
              text: {
                text: edgeMeta.roleOfTarget,
                fill: token.colorText,
              },
              rect: {
                fill: "transparent",
              },
            },
            position: edgeMeta.roleOnTargetPosition || ROLE_SOURCE_TARGET_CONST,
          },
          {
            attrs: {
              text: {
                text: edgeMeta.targetMultiplicity,
                fill: token.colorText,
              },
              rect: {
                fill: "transparent",
              },
            },
            position: edgeMeta.targetMultiplicityPosition || MULTI_SOURCE_TARGET_CONST,
          },
        ]);
      }
    });

    graph?.getEdges().forEach((edge) => {
      if (
        !edges?.find((aEdge) => aEdge.id === edge.id) &&
        edge.id !== drawingLine?.tempEdgeId
      ) {
        graph?.removeEdge(edge.id);
      }
    });
  }, [drawingLine?.tempEdgeId, edges, graph, selectedElement, token]);
}
function addNewEdge(graph: Graph | undefined, edgeMeta: EdgeConfig, selectedElement: string | undefined, token:GlobalToken) {
  const grahpEdge = graph?.addEdge({
    id: edgeMeta.id,
    source: {
      cell: edgeMeta.sourceId,
      anchor: edgeMeta.sourceAnchor,
    },
    target: {
      cell: edgeMeta.targetId,
      anchor: edgeMeta.targetAnchor,
    },
    vertices: edgeMeta.vertices,
    args: {
      stopPropagation: false,
    },
    //connector: { name: "rounded" },
    //解决直连时，不能显示选中状态的bug
    tools: selectedElement === edgeMeta.id
      ? [
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
      ]
      : [],
    attrs: getRelationGraphAttrs(edgeMeta.relationType, token),
    data: { relationType: edgeMeta.relationType },
  });
  return grahpEdge;
}

