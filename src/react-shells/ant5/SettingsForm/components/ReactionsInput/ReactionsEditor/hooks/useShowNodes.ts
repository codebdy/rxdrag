import { Cell } from "@antv/x6";
import { useContext, useEffect } from "react";
import { ILogicMetas } from "runner/reaction/metas";
import { ReacionsEditorContext } from "../contexts";
import { createUuid } from "../utils";
import { useGetEndNodeAttrs } from "./useGetEndNodeAttrs";
import { useGetStartNodeAttrs } from "./useGetStartNodeAttrs";
import { useGetStartNodeConfig } from "./useGetStartNodeConfig";
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

const metas: ILogicMetas = {
  inputs: [
    {
      uuid: createUuid(),
      name: "input",
      label: "输入"
    }
  ],
  outputs: [
    {
      uuid: createUuid(),
      name: "output",
      label: "输出"
    }
  ],
  reactions: [],
  invakes: []
}

export function useNodesShow() {
  const { graph } = useContext(ReacionsEditorContext) || {}
  const getStartNodeConfig = useGetStartNodeConfig()
  const getEndNodeAttrs = useGetEndNodeAttrs()

  useEffect(() => {
    if (graph) {
      const cells: Cell[] = []

      for (const inputNode of metas.inputs) {
        cells.push(graph.createNode(getStartNodeConfig(inputNode)))
      }

      for (let i = 0; i < metas.outputs.length; i++) {
        const outputNode = metas.outputs[i]
        cells.push(graph.createNode({
          shape: 'circle',
          x: 700,
          y: 200 + 60 * i,
          width: 20,
          height: 20,
          ...outputNode.x6Node,
          id: outputNode.uuid,
          label: outputNode.label,
          attrs: getEndNodeAttrs(),
          ports: {
            groups: {
              in: {
                attrs: {
                  circle: {
                    r: 10,
                    magnet: true,
                    stroke: '#31d0c6',
                    fill: '#fff',
                    strokeWidth: 5,
                  },
                },
              },
            },
            items: [
              {
                id: 'port1',
                group: 'in',
                args: {
                  dx: 10,
                }
              },
            ],
          }
        }))
      }
      cells.push(graph.addNode({
        shape: 'reaction-node',
        x: 340,
        y: 240,
        width: 80,
        height: 40,
        data: {
          label: 'rect',
        },
        attrs: commonAttrs,
        ports: [
          {
            "id": "3-1",
            "group": "left"
          },
          {
            "id": "3-2",
            "group": "out",
          },
          {
            "id": "3-3",
            "group": "out",
          }
        ]
      }))

      cells.push(graph.addNode({
        shape: 'reaction-node',
        x: 440,
        y: 240,
        width: 80,
        height: 40,
        data: {
          label: 'rect',
        },
        attrs: commonAttrs,
        ports: [
          {
            "id": "4-1",
            "group": "left"
          },
          {
            "id": "4-2",
            "group": "out",
          },
          {
            "id": "4-3",
            "group": "out",
          }
        ]
      }))
      graph.resetCells(cells)
    }
  }, [getEndNodeAttrs, getStartNodeConfig, graph])
}