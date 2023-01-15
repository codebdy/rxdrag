import { Cell, Graph } from "@antv/x6";
import { useCallback, useEffect } from "react";
import { NodeStatus } from "../AlgoNode";

const nodeStatusList = [
  [
    {
      id: '1',
      status: 'running',
    },
    {
      id: '2',
      status: 'default',
    },
    {
      id: '3',
      status: 'default',
    },
    {
      id: '4',
      status: 'default',
    },
  ],
  [
    {
      id: '1',
      status: 'success',
    },
    {
      id: '2',
      status: 'running',
    },
    {
      id: '3',
      status: 'default',
    },
    {
      id: '4',
      status: 'default',
    },
  ],
  [
    {
      id: '1',
      status: 'success',
    },
    {
      id: '2',
      status: 'success',
    },
    {
      id: '3',
      status: 'running',
    },
    {
      id: '4',
      status: 'running',
    },
  ],
  [
    {
      id: '1',
      status: 'success',
    },
    {
      id: '2',
      status: 'success',
    },
    {
      id: '3',
      status: 'success',
    },
    {
      id: '4',
      status: 'failed',
    },
  ],
]

const data = [
  {
    "id": "1",
    "shape": "dag-node",
    "x": 290,
    "y": 110,
    "data": {
      "label": "读数据",
      "status": "success"
    },
    "ports": [
      {
        "id": "1-1",
        "group": "bottom"
      }
    ]
  },
  {
    "id": "2",
    "shape": "dag-node",
    "x": 290,
    "y": 225,
    "data": {
      "label": "逻辑回归",
      "status": "success"
    },
    "ports": [
      {
        "id": "2-1",
        "group": "top"
      },
      {
        "id": "2-2",
        "group": "bottom"
      },
      {
        "id": "2-3",
        "group": "bottom"
      }
    ]
  },
  {
    "id": "3",
    "shape": "dag-node",
    "x": 170,
    "y": 350,
    "data": {
      "label": "模型预测",
      "status": "success"
    },
    "ports": [
      {
        "id": "3-1",
        "group": "top"
      },
      {
        "id": "3-2",
        "group": "bottom"
      }
    ]
  },
  {
    "id": "4",
    "shape": "dag-node",
    "x": 450,
    "y": 350,
    "data": {
      "label": "读取参数",
      "status": "success"
    },
    "ports": [
      {
        "id": "4-1",
        "group": "top"
      },
      {
        "id": "4-2",
        "group": "bottom"
      }
    ]
  },
  {
    "id": "5",
    "shape": "dag-edge",
    "source": {
      "cell": "1",
      "port": "1-1"
    },
    "target": {
      "cell": "2",
      "port": "2-1"
    },
    "zIndex": 0
  },
  {
    "id": "6",
    "shape": "dag-edge",
    "source": {
      "cell": "2",
      "port": "2-2"
    },
    "target": {
      "cell": "3",
      "port": "3-1"
    },
    "zIndex": 0
  },
  {
    "id": "7",
    "shape": "dag-edge",
    "source": {
      "cell": "2",
      "port": "2-3"
    },
    "target": {
      "cell": "4",
      "port": "4-1"
    },
    "zIndex": 0
  }
]
export function useAddNodes(graph?: Graph) {
  // 初始化节点/边
  const init = useCallback((data: Cell.Metadata[]) => {
    if (graph) {
      const cells: Cell[] = []
      data.forEach((item) => {
        console.log("哈哈2", item)
        if (item.shape === 'dag-node') {
          cells.push(graph.createNode(item))
        } else {
          cells.push(graph.createEdge(item))
        }
      })
      graph.resetCells(cells)
    }

  }, [graph])

  // 显示节点状态
  const showNodeStatus = useCallback(async (statusList: NodeStatus[][]) => {
    if(!graph){
      return
    }
    const status = statusList.shift()
    status?.forEach((item) => {
      const { id, status } = item
      const node = graph.getCellById(id)
      const data = node.getData() as NodeStatus
      node.setData({
        ...data,
        status: status,
      })
    })
    setTimeout(() => {
      showNodeStatus(statusList)
    }, 3000)
  }, [graph])

  useEffect(() => {
    if (graph) {
      init(data)
      showNodeStatus(nodeStatusList as any)
      graph.centerContent()
    }

  }, [graph, init, showNodeStatus])
}