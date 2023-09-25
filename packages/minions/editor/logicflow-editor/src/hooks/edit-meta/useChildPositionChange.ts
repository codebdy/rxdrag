import { useCallback, useEffect } from "react";
import { useGraph } from "../useGraph";
import { Node } from "@antv/x6"
import { getParentSize } from "./getParentSize";

export function useChildPositionChange() {
  const graph = useGraph()

  const handlePositionChange = useCallback(({ node }: { node: Node }) => {
    const pos = getParentSize(node)

    const parent = node.getParent()
    if (pos && parent && parent.isNode()) {
      parent.setPosition(pos.position)
      parent.setSize(pos.size)
    }
  }, [])

  useEffect(() => {
    graph?.on('node:change:position', handlePositionChange)

    return () => {
      graph?.off('node:change:position', handlePositionChange)
    }
  }, [graph, handlePositionChange])
}