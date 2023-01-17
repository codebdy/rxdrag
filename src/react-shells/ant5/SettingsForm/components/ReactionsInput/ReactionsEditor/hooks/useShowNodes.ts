import { Cell } from "@antv/x6";
import { useContext, useEffect } from "react";
import { ReacionsEditorContext } from "../contexts";
const commonAttrs = {
  body: {
    fill: '#111',
    stroke: '#ccc',
    strokeWidth: 2,
    filter: {
      name: "outline",
      args: {
        color: 'rgba(22,104,220, 0.7)',
        width: 2,
        margin: 0,
      },
    },
  },
  label: {
    refX: '100%',
    refX2: 4,
    refY: 0.5,
    textAnchor: 'start',
    textVerticalAnchor: 'middle',
    fill: "#fff"
  },
}
const commonAttrs2 = {
  body: {
    fill: 'transparent',
    stroke: '#ccc',
    strokeWidth: 4,
  },
  label: {
    refX: 0.5,
    refY: '100%',
    refY2: 4,
    textAnchor: 'middle',
    textVerticalAnchor: 'top',
    fill: "#fff"
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
        label: '输入',
        attrs: commonAttrs,
      }))
      cells.push(graph.createNode({
        shape: 'circle',
        "x": 130,
        "y": 130,
        width: 20,
        height: 20,
        label: 'circle',
        attrs: commonAttrs2,
      }))
      cells.push(graph.addNode({
        shape: 'rect',
        x: 340,
        y: 240,
        width: 80,
        height: 40,
        label: 'rect',
        attrs: commonAttrs,
        "ports": [
          {
            "id": "3-1",
            "group": "left"
          },
          {
            "id": "3-2",
            "group": "out",
            args: {
              dx: 4,
            }
          }
        ]
      }))
      graph.resetCells(cells)
    }
  }, [graph])
}