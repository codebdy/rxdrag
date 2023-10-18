import { useMemo } from "react";
import { useRecoilValue } from "recoil";
import { x6NodesState } from "../recoil/atoms";
import { ID } from "@rxdrag/shared";

export function useDiagramNodes(diagramUuid:string, metaId: ID){
  const nodes = useRecoilValue(x6NodesState(metaId));

  const diagramNodes = useMemo(()=>{
    return nodes.filter(node=>node.diagramUuid === diagramUuid)
  }, [diagramUuid, nodes])

  return diagramNodes;
}