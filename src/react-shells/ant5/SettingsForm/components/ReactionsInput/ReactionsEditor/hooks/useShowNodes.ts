import { Cell } from "@antv/x6";
import { useContext, useEffect } from "react";
import { ILogicMetas } from "runner/reaction/metas";
import { ReacionsEditorContext } from "../contexts";
import { createUuid } from "../utils";
import { useGetStartNodeAttrs } from "./useGetStartNodeAttrs";
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
/*
export interface ILogicMetas {
  nodes: INodeMeta[]
  invakes: IInvokeMeta[]
  x6Nodes: IX6NodeMeta[]
  x6Edges: IX6EdgeMeta[]
}
*/
const metas: ILogicMetas = {
  inputs: [
    {
      uuid: createUuid(),
      name: "input",
      label: "输入"
    }
  ],
  outputs: [],
  reactions: [],
  invakes: []
}

export function useNodesShow() {
  const { graph } = useContext(ReacionsEditorContext) || {}
  const getStartNodeAttrs = useGetStartNodeAttrs()
  useEffect(() => {
    if (graph) {
      const cells: Cell[] = []

      for (let i = 0; i < metas.inputs.length; i++) {
        const inputNode = metas.inputs[i]
        cells.push(graph.createNode({
          shape: 'circle',
          x: 60,
          y: 60 + 60 * i,
          width: 20,
          height: 20,
          ...inputNode.x6Node,
          id: inputNode.uuid,
          label: inputNode.label,
          attrs: getStartNodeAttrs(),
          ports: {
            groups: {
              out: {
                attrs: {
                  circle: {
                    r: 10,
                    magnet: true,
                    stroke: '#31d0c6',
                    fill: '#fff',
                    strokeWidth: 2,
                  },
                },
              },
            },
            items: [
              {
                id: 'port1',
                group: 'out',
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
          }
        ]
      }))
      graph.resetCells(cells)
    }
  }, [getStartNodeAttrs, graph])
}