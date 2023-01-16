import { Cell } from "@antv/x6";
import { useContext, useEffect } from "react";
import { ReacionsEditorContext } from "../contexts";
const commonAttrs = {
  body: {
    fill: 'transparent',
    stroke: '#8f8f8f',
    strokeWidth: 1,
  },
  label: {
    refX: 0.5,
    refY: '100%',
    refY2: 4,
    textAnchor: 'middle',
    textVerticalAnchor: 'top',
  },
}
export function useNodesShow() {
  const { graph } = useContext(ReacionsEditorContext) || {}

  useEffect(() => {
    if (graph) {
      const cells: Cell[] = []
      cells.push(graph.createNode({
        shape: 'circle',
        "x": 30,
        "y": 30,
        width: 20,
        height: 20,
        label: 'circle',
        attrs: commonAttrs,
      }))
      cells.push(graph.createNode({
        shape: 'circle',
        "x": 130,
        "y": 130,
        width: 20,
        height: 20,
        label: 'circle',
        attrs: commonAttrs,
      }))
      graph.resetCells(cells)
    }
  }, [graph])
}