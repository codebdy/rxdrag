import { GlobalToken } from "antd/es/theme/interface"
import { IReactionNodeMeta } from "runner/reaction/interfaces/metas"

export const getSingleNodeConfig = (nodeMeta: IReactionNodeMeta, token: GlobalToken) => {
  return {
    shape: 'reaction-node',
    x: 340,
    y: 240,
    width: 80,
    height: 40,
    data: {
      label: nodeMeta.label,
    },
    attrs: {
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
        fill: token.colorText
      },
    },
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
  }
}