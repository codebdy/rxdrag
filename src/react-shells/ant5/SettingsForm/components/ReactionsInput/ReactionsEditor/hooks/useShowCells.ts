import { Cell } from "@antv/x6";
import { useEffect } from "react";
import { useGetEndNodeConfig } from "./useGetEndNodeConfig";
import { useGetStartNodeConfig } from "./useGetStartNodeConfig";
import { useEditorState } from "./useEditorState";
// const commonAttrs = {
//   body: {
//     fill: '#111',
//     stroke: '#ccc',
//     strokeWidth: 2,
//     filter: {
//       name: "outline",
//       args: {
//         color: 'rgba(22,104,220, 0.7)',
//         width: 2,
//         margin: 0,
//       },
//     },
//   },
//   label: {
//     refX: '100%',
//     refX2: 4,
//     refY: 0.5,
//     textAnchor: 'start',
//     textVerticalAnchor: 'middle',
//     fill: "#fff"
//   },
// }
// const commonAttrs2 = {
//   body: {
//     fill: 'transparent',
//     stroke: '#ccc',
//     strokeWidth: 4,
//   },
//   label: {
//     refX: 0.5,
//     refY: '100%',
//     refY2: 4,
//     textAnchor: 'middle',
//     textVerticalAnchor: 'top',
//     fill: "#fff"
//   },
// }

// const metas: ILogicMetas = {
//   inputs: [
//     {
//       uuid: createUuid(),
//       name: "input",
//       label: "输入"
//     }
//   ],
//   outputs: [
//     {
//       uuid: createUuid(),
//       name: "output",
//       label: "输出"
//     }
//   ],
//   reactions: [],
//   invakes: []
// }

export function useShowCells() {
  const { graph } = useEditorState()
  const getStartNodeConfig = useGetStartNodeConfig()
  const getEndNodeConfig = useGetEndNodeConfig()
  const { metas } = useEditorState()
  useEffect(() => {
    if (graph) {
      const cells: Cell[] = []
      const oldNodes = graph.getNodes()
      const oldCells = graph.getCells()

      for (const inputNode of metas.reactions) {
        const grahpNode = oldNodes.find(node => node.id === inputNode.uuid)
        //更新
        if (grahpNode) {
          grahpNode.setSize(inputNode.x6Node as any);
          grahpNode.setPosition(inputNode.x6Node as any);
        } else {//新建
          cells.push(graph.createNode(getStartNodeConfig(inputNode)))
        }
      }


      //删除不存在的
      for (const cell of oldCells) {
        if (![...metas.reactions, ...metas.invakes].find(el => el.uuid === cell.id)) {
          cell.remove()
        }
      }

      // cells.push(graph.addNode({
      //   shape: 'reaction-node',
      //   x: 340,
      //   y: 240,
      //   width: 80,
      //   height: 40,
      //   data: {
      //     label: 'rect',
      //   },
      //   attrs: commonAttrs,
      //   ports: [
      //     {
      //       "id": "3-1",
      //       "group": "left"
      //     },
      //     {
      //       "id": "3-2",
      //       "group": "out",
      //     },
      //     {
      //       "id": "3-3",
      //       "group": "out",
      //     }
      //   ]
      // }))

      // cells.push(graph.addNode({
      //   shape: 'reaction-node',
      //   x: 440,
      //   y: 240,
      //   width: 80,
      //   height: 40,
      //   data: {
      //     label: 'rect',
      //   },
      //   attrs: commonAttrs,
      //   ports: [
      //     {
      //       "id": "4-1",
      //       "group": "left"
      //     },
      //     {
      //       "id": "4-2",
      //       "group": "out",
      //     },
      //     {
      //       "id": "4-3",
      //       "group": "out",
      //     }
      //   ]
      // }))
      graph.resetCells(cells)
    }
  }, [getEndNodeConfig, getStartNodeConfig, graph, metas.invakes, metas.reactions])
}