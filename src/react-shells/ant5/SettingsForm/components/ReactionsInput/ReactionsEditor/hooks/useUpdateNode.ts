import { useCallback } from "react";
import { IReactionNodeMeta, ReactionType } from "runner/reaction/interfaces/metas";
import { Node } from "@antv/x6"
import { useGetSingleNodeWidth } from "./useGetSingleNodeWidth";
import { useTransformPorts } from "./useTransformPorts";

export function useUpdateNode() {
  const getNodeWidth = useGetSingleNodeWidth()

  const transPorts = useTransformPorts()
  const update = useCallback((graphNode: Node<Node.Properties>, nodeMeta: IReactionNodeMeta) => {
    if (nodeMeta.x6Node) {
      graphNode.setPosition(nodeMeta.x6Node);
      graphNode.replaceData({ ...graphNode.data, meta: nodeMeta })
      if (nodeMeta.type === ReactionType.Start || nodeMeta.type === ReactionType.End) {
        graphNode.attr("text/text", nodeMeta.label)
      } else {
        graphNode.setSize({ ...nodeMeta.x6Node, width: getNodeWidth(nodeMeta) });
        const oldPorts = graphNode.getPorts()
        const ports = transPorts(nodeMeta)
        for (const port of ports || []) {
          if (oldPorts.find(prt => prt.id === port.id)) {
            graphNode.portProp(port.id, 'attrs/text/text', port.attrs.text.text)
          } else {
            graphNode.addPort(port)
          }
        }

        for (const port of oldPorts) {
          if (!ports.find(prt => prt.id === port.id)) {
            graphNode.removePort(port.id || "")
          }
        }
      }
    }
  }, [getNodeWidth, transPorts])

  return update
}