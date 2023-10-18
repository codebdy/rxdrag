import { useMemo } from "react";
import { useRecoilValue } from "recoil";
import { ID } from "shared";
import { RelationMeta } from "../meta/RelationMeta";
import { X6EdgeMeta } from "../meta/X6EdgeMeta";
import { relationsState, x6EdgesState } from "../recoil/atoms";
import { useDiagramNodes } from "./useDiagramNodes";

export type EdgeConfig = X6EdgeMeta & RelationMeta;

export function useDiagramEdges(diagramUuid: string, metaId: ID) {
  const diagramEdges = useRecoilValue(x6EdgesState(metaId));
  const relations = useRecoilValue(relationsState(metaId));
  const existsNodes = useDiagramNodes(diagramUuid, metaId);

  const existsDiagramEdges = useMemo(() => {
    return diagramEdges.filter((edge) => edge.diagramUuid === diagramUuid);
  }, [diagramEdges, diagramUuid]);

  const rtEdges: EdgeConfig[] = useMemo(() => {
    const edges: EdgeConfig[] = [];
    relations.forEach((relation) => {
      const source = existsNodes.find((node) => node.id === relation.sourceId);
      const target = existsNodes.find((node) => node.id === relation.targetId);
      if (source && target) {
        const edge = existsDiagramEdges.find(
          (edge) => edge.id === relation.uuid
        );
        if (edge) {
          edges.push({
            ...edge,
            ...relation,
          });
        } else {
          const newEdge = { id: relation.uuid, sourceAnchor:undefined, targetAnchor:undefined };
          edges.push({
            ...newEdge,
            ...relation,
            diagramUuid,
          });
        }
      }
    });
    return edges;
  }, [diagramUuid, existsDiagramEdges, existsNodes, relations]);

  return rtEdges;
}
