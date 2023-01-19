import { Cell } from "@antv/x6";
import { useEffect } from "react";
import { useGetNodeConfig } from "./useGetNodeConfig";
import { useEditorState } from "./useEditorState";

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
  const getStartNodeConfig = useGetNodeConfig()
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
      graph.resetCells(cells)
    }
  }, [getStartNodeConfig, graph, metas.invakes, metas.reactions])
}