import { ID } from "@rxdrag/shared";
import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { MetaContent } from "../interfaces";
import { packagesState, classesState, relationsState, diagramsState, x6NodesState, x6EdgesState } from "../recoil/atoms";

export function useGetMeta(metaId: ID) {
  const packages = useRecoilValue(packagesState(metaId))
  const classes = useRecoilValue(classesState(metaId));
  const relations = useRecoilValue(relationsState(metaId));
  const diagrams = useRecoilValue(diagramsState(metaId));
  const x6Nodes = useRecoilValue(x6NodesState(metaId));
  const x6Edges = useRecoilValue(x6EdgesState(metaId));
  const getMeta = useCallback(() => {
    const clses = classes.filter(cls => packages.find(pkg => cls.packageUuid === pkg.uuid))
    const relns = relations.filter(relation => {
      const sourceClass = clses.find(cls => cls.uuid === relation.sourceId)
      return !!sourceClass
    })
    const diagms = diagrams.filter(diagram => packages.find(pkg => pkg.uuid === diagram.packageUuid))
    const content: MetaContent = {
      //id: parseInt(metaId),
      packages: packages,
      classes: clses,
      relations: relns,
      diagrams: diagms,
      x6Nodes,
      x6Edges,
    };

    return content;
  }, [classes, diagrams, packages, relations, x6Edges, x6Nodes]);

  return getMeta
}