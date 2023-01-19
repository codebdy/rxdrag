import { GlobalToken } from "antd/es/theme/interface"
import { IReactionMaterial } from "runner/reaction/interfaces/material"
import { IReactionNodeMeta } from "runner/reaction/interfaces/metas"

export const getSingleNodeConfig = (nodeMeta: IReactionNodeMeta, token: GlobalToken, material: IReactionMaterial | undefined) => {
  return {
    shape: "reaction-node",
    x: 340,
    y: 240,
    width: 80,
    height: 40,
    data: {
      nodeMeta,
      backgroundColor: token.colorBgContainer,
      color: token.colorTextSecondary,
      material,
      token
    },
    ports: {
      groups: {
        left: {
          position: 'left',
          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: token.colorTextSecondary,
              strokeWidth: 1,
              fill: token.colorBgContainer,
            },
          },

        },
        out: {
          position: 'right',
          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: token.colorTextSecondary,
              strokeWidth: 1,
              fill: token.colorBgContainer,
            },
          },
        },
      },
      items: [
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
    },
  }
}