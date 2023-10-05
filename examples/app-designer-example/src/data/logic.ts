import { IFlow, IScript } from "../interfaces/flow";

export const allFlows: IFlow[] = [
  {
    "id": "0_Jv917c",
    "name": "主流程",
    "ownerId": "mole",
    "moduleId": "mole",
    "type": "normal",
    "metas": {
      "lines": [
        {
          "id": "-v00jBGR",
          "source": {
            "nodeId": "8678623f-32ed-43a0-ba44-83a842aaa725",
            "portId": "SwZM1_RN"
          },
          "target": {
            "nodeId": "e0d4c491-c80e-4169-a54a-336f29ada597",
            "portId": "no7ZNze6"
          }
        },
        {
          "id": "rPPUZHXW",
          "source": {
            "nodeId": "64241bdd-be57-4e04-81d5-f9eb73ec5d84",
            "portId": "XP2sTYBg"
          },
          "target": {
            "nodeId": "e0d4c491-c80e-4169-a54a-336f29ada597",
            "portId": "6JGk2cb0"
          }
        },
        {
          "id": "XCBT_EyK",
          "source": {
            "nodeId": "e0d4c491-c80e-4169-a54a-336f29ada597",
            "portId": "3rNhIWkA"
          },
          "target": {
            "nodeId": "64aa1596-bfce-4e29-b924-f5c3f5e7358b",
            "portId": "39gmGTNW"
          }
        },
        {
          "id": "EpKBN6oO",
          "source": {
            "nodeId": "d4f095cc-e0a6-4744-849a-36e94e0f3dc9",
            "portId": "fJC9H3Wk"
          },
          "target": {
            "nodeId": "64aa1596-bfce-4e29-b924-f5c3f5e7358b",
            "portId": "2yGRi_65"
          }
        },
        {
          "id": "Tg8h_KCx",
          "source": {
            "nodeId": "64aa1596-bfce-4e29-b924-f5c3f5e7358b",
            "portId": "0-0B6jEY"
          },
          "target": {
            "nodeId": "b77648e6-97bd-4468-b43b-f8c1819249a4",
            "portId": "eOc1fUzn"
          }
        }
      ],
      "nodes": [
        {
          "id": "8678623f-32ed-43a0-ba44-83a842aaa725",
          "type": "Activity",
          "activityName": "system-react.event",
          "outPorts": [
            {
              "id": "SwZM1_RN",
              "name": "onClick",
              "label": "点击"
            }
          ],
          "config": {
            "param": {
              "controllerId": "uQPenUqJ"
            }
          },
          "x6Node": {
            "x": 70,
            "y": 180,
            "width": 116,
            "height": 32
          }
        },
        {
          "id": "64241bdd-be57-4e04-81d5-f9eb73ec5d84",
          "type": "Activity",
          "activityName": "system-react.event",
          "outPorts": [
            {
              "id": "XP2sTYBg",
              "name": "onClick",
              "label": "点击"
            }
          ],
          "config": {
            "param": {
              "controllerId": "-V60Mne6"
            }
          },
          "x6Node": {
            "x": 70,
            "y": 270,
            "width": 116,
            "height": 32
          }
        },
        {
          "id": "e0d4c491-c80e-4169-a54a-336f29ada597",
          "label": "信号发生器",
          "type": "Activity",
          "activityName": "system.signals",
          "inPorts": [
            {
              "id": "no7ZNze6",
              "name": "startUp",
              "label": "启动"
            },
            {
              "id": "6JGk2cb0",
              "name": "stop",
              "label": "停止"
            }
          ],
          "outPorts": [
            {
              "id": "3rNhIWkA",
              "name": "output",
              "label": ""
            }
          ],
          "config": {
            "interval": 1000
          },
          "x6Node": {
            "x": 290,
            "y": 230,
            "width": 130,
            "height": 32
          }
        },
        {
          "id": "d4f095cc-e0a6-4744-849a-36e94e0f3dc9",
          "label": "地鼠数量",
          "type": "Activity",
          "activityName": "system-react.setVariable",
          "outPorts": [
            {
              "id": "fJC9H3Wk",
              "name": "output",
              "label": "$valueChange"
            }
          ],
          "config": {
            "param": {
              "variable": "_-uxpUk0"
            }
          },
          "x6Node": {
            "x": 340,
            "y": 350,
            "width": 116,
            "height": 32
          }
        },
        {
          "id": "b77648e6-97bd-4468-b43b-f8c1819249a4",
          "label": "活跃地鼠",
          "type": "Activity",
          "activityName": "system-react.setVariable",
          "inPorts": [
            {
              "id": "eOc1fUzn",
              "name": "input",
              "label": "$setValue"
            }
          ],
          "outPorts": [
            {
              "id": "3efAh5Qu",
              "name": "output",
              "label": ""
            }
          ],
          "config": {
            "param": {
              "variable": "2AHnQ-ne"
            }
          },
          "x6Node": {
            "x": 720,
            "y": 240,
            "width": 116,
            "height": 32
          }
        },
        {
          "id": "64aa1596-bfce-4e29-b924-f5c3f5e7358b",
          "label": "随机数",
          "type": "Activity",
          "activityName": "system.random",
          "inPorts": [
            {
              "id": "39gmGTNW",
              "name": "startUp",
              "label": "启动"
            },
            {
              "id": "YjjWXhfb",
              "name": "minValue",
              "label": "最小值"
            },
            {
              "id": "2yGRi_65",
              "name": "maxValue",
              "label": "最大值"
            }
          ],
          "outPorts": [
            {
              "id": "0-0B6jEY",
              "name": "output",
              "label": ""
            }
          ],
          "config": {},
          "x6Node": {
            "x": 550,
            "y": 220,
            "width": 102,
            "height": 48
          }
        }
      ]
    }
  }
] as any
export const allScripts: IScript[] = []
