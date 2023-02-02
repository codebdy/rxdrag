import { useCallback } from "react";
import { IReactionNodeMeta, ReactionType } from "runner/reaction/interfaces/metas";
import { Node } from "@antv/x6"
import { useGetSingleNodeWidth } from "./useGetSingleNodeWidth";

export function useUpdateNode() {
  const getNodeWidth = useGetSingleNodeWidth()

  const update = useCallback((graphNode: Node<Node.Properties>, nodeMeta: IReactionNodeMeta) => {
    if (nodeMeta.x6Node) {
      graphNode.setPosition(nodeMeta.x6Node);
      graphNode.replaceData({ ...graphNode.data, meta: nodeMeta })
      if (nodeMeta.type === ReactionType.Start || nodeMeta.type === ReactionType.End) {
        graphNode.attr("text/text", nodeMeta.label)
      } else {
        graphNode.setSize({ ...nodeMeta.x6Node, width: getNodeWidth(nodeMeta) });
      }
    }
  }, [getNodeWidth])

  return update
}