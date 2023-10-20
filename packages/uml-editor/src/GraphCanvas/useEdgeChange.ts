/* eslint-disable @typescript-eslint/no-explicit-any */
import { Edge, Graph } from "@antv/x6";
import { useCallback, useEffect } from "react";
import _ from "lodash";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  drawingLineState,
  selectedUmlDiagramState,
  x6EdgesState,
} from "../recoil/atoms";
import { useGetEdge } from "../hooks/useGetEdge";
import {
  MULTI_SOURCE_POSITION_CONST,
  MULTI_SOURCE_TARGET_CONST,
  ROLE_SOURCE_POSITION_CONST,
  ROLE_SOURCE_TARGET_CONST,
} from "./constLabelPosition";
import { useBackupSnapshot } from "../hooks/useBackupSnapshot";
import { ID } from "@rxdrag/shared";

export function useEdgeChange(graph: Graph | undefined, metaId: ID) {
  const selectedDiagram = useRecoilValue(selectedUmlDiagramState(metaId));
  const drawingLine = useRecoilValue(drawingLineState(metaId));
  const setEdges = useSetRecoilState(x6EdgesState(metaId));
  const getEdge = useGetEdge(metaId);
  const backupSnapshot = useBackupSnapshot(metaId);

  const handleEdgeChange = useCallback(
    (arg: { edge: Edge<Edge.Properties> }) => {
      const { edge } = arg;
      if (!selectedDiagram || !edge?.id) {
        return;
      }

      if (edge.id === drawingLine?.tempEdgeId) {
        return;
      }

      const edageData = getEdge(edge.id, selectedDiagram);

      const [
        roleOnSource,
        sourceMultiplicity,
        roleOnTarget,
        targetMultiplicity,
      ] = edge.getLabels();

      // if (!edageData) {
      //   console.log("edageData没找到");
      //   return;
      // }

      //如果是没有修改过的并且是新建的线
      if (
        !edageData &&
        edge.getVertices().length === 0 &&
        (!roleOnSource?.position ||
          _.isEqual(roleOnSource?.position, ROLE_SOURCE_POSITION_CONST)) &&
        (!sourceMultiplicity?.position ||
          _.isEqual(sourceMultiplicity?.position, MULTI_SOURCE_POSITION_CONST)) &&
        (!roleOnTarget?.position ||
          _.isEqual(roleOnTarget?.position, ROLE_SOURCE_TARGET_CONST)) &&
        (!targetMultiplicity?.position ||
          _.isEqual(targetMultiplicity?.position, MULTI_SOURCE_TARGET_CONST))
      ) {
        return;
      }

      //需要判断是否有修改
      if (
        _.isEqual(edageData?.vertices, edge.getVertices()) &&
        _.isEqual(edageData?.roleOnSourcePosition, roleOnSource?.position) &&
        _.isEqual(edageData?.sourceMultiplicityPosition, sourceMultiplicity?.position) &&
        _.isEqual(edageData?.roleOnTargetPosition, roleOnTarget?.position) &&
        _.isEqual(edageData?.targetMultiplicityPosition, targetMultiplicity?.position)
      ) {
        return;
      }

      backupSnapshot();
      if (edageData) {
        setEdges((edages) =>
          edages.map((eg) =>
            eg.id === edageData?.id && eg.diagramUuid === edageData?.diagramUuid
              ? {
                id: edge.id,
                vertices: edge.getVertices(),
                roleOnSourcePosition: roleOnSource?.position as any,
                sourceMultiplicityPosition: sourceMultiplicity?.position as any,
                roleOnTargetPosition: roleOnTarget?.position as any,
                targetMultiplicityPosition: targetMultiplicity?.position as any,
                diagramUuid: edageData?.diagramUuid,
                sourceAnchor: (edge.source as any)["anchor"],
                targetAnchor: (edge.target as any)["anchor"],
              }
              : eg
          )
        );
      } else {
        setEdges((edages) => [...edages,
        {
          id: edge.id,
          vertices: edge.getVertices(),
          roleOnSourcePosition: roleOnSource?.position as any,
          sourceMultiplicityPosition: sourceMultiplicity?.position as any,
          roleOnTargetPosition: roleOnTarget?.position as any,
          targetMultiplicityPosition: targetMultiplicity?.position as any,
          diagramUuid: selectedDiagram,
          sourceAnchor: (edge.source as any)["anchor"],
          targetAnchor: (edge.target as any)["anchor"],
        }
        ]);
      }

    },
    [
      backupSnapshot,
      drawingLine?.tempEdgeId,
      getEdge,
      selectedDiagram,
      setEdges,
    ]
  );

  useEffect(() => {
    graph?.on("edge:mouseup", handleEdgeChange);
    return () => {
      graph?.off("edge:mouseup", handleEdgeChange);
    };
  }, [graph, handleEdgeChange]);
}
