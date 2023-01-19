import { GlobalToken } from "antd/es/theme/interface"
import { IReactionNodeMeta } from "runner/reaction/interfaces/metas"

const STROKE_WIDTH = 2
export const getStartNodeConfig = (reactionNodeMeta: IReactionNodeMeta, token: GlobalToken) => {
  return {
    shape: 'circle',
    x: 90,
    y: 60,
    width: 20,
    height: 20,
    ...reactionNodeMeta.x6Node,
    id: reactionNodeMeta.uuid,
    label: reactionNodeMeta.label,
    attrs: {
      body: {
        fill: "#8297da",
        stroke: token.colorText,
        strokeWidth: 0,//STROKE_WIDTH,
      },
      label: {
        refX: '-10',
        refY: 0.5,
        textAnchor: 'end',
        textVerticalAnchor: 'middle',
        fill: token.colorTextSecondary,
      },
    },
    ports: {
      groups: {
        out: {
          attrs: {
            circle: {
              r: 10,
              magnet: true,
              stroke: "#5e76c3",
              fill: "#8297da",
              strokeWidth: STROKE_WIDTH,
            },
          },
        },
      },
      items: [
        {
          id: 'out',
          group: 'out',
          args: {
            dx: 10,
          }
        },
      ],
    },
  }
}