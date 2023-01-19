import { GlobalToken } from "antd/es/theme/interface"
import { IReactionMaterial } from "runner/reaction/interfaces/marerial"
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