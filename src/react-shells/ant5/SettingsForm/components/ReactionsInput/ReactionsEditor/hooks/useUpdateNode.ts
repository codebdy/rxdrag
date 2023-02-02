import { useCallback } from "react";
import { IReactionNodeMeta, ReactionType } from "runner/reaction/interfaces/metas";
import { Node } from "@antv/x6"

export function useUpdateNode() {

  const update = useCallback((graphNode: Node<Node.Properties>, nodeMeta: IReactionNodeMeta) => {
    if (nodeMeta.x6Node) {
      graphNode.setSize(nodeMeta.x6Node);
      graphNode.setPosition(nodeMeta.x6Node);
      graphNode.replaceData({ ...graphNode.data, meta: nodeMeta })
      if (nodeMeta.type === ReactionType.Start || nodeMeta.type === ReactionType.End) {
        graphNode.attr("text/text", nodeMeta.label)
      }
    }
  }, [])

  return update
}