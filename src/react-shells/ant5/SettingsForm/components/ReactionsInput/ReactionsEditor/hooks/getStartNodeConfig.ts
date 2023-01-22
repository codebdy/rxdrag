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
    data: { meta: reactionNodeMeta },
    attrs: {
      body: {
        fill: token.colorBgContainer,//"#8297da",
        stroke: token.colorText,//stroke: '#5e76c3',
        strokeWidth: STROKE_WIDTH,
        magnet: true,
        class: "start-node",
      },
      label: {
        refX: '-10',
        refY: 0.5,
        textAnchor: 'end',
        textVerticalAnchor: 'middle',
        fill: token.colorTextSecondary,
      },
    },
  }
}