import { GlobalToken } from "antd/es/theme/interface"
import { IReactionMeta } from "runner/minions/interfaces/metas"

const STROKE_WIDTH = 5
export const getEndNodeConfig = (nodeMeta: IReactionMeta, token: GlobalToken) => {
  return {
    id: nodeMeta.id,
    shape: 'circle',
    x: 700,
    y: 200,
    width: 20,
    height: 20,
    ...nodeMeta.x6Node,
    label: nodeMeta.label,
    data: { meta: nodeMeta },
    attrs: {
      body: {
        fill: token.colorBgBase,
        stroke: token.colorText,
        strokeWidth: STROKE_WIDTH,
        magnet: true,
        class: 'end-node',
      },
      label: {
        refX: '100%',
        refX2: 10,
        refY: 0.5,
        textAnchor: 'start',
        textVerticalAnchor: 'middle',
        fill: token.colorTextSecondary,
      },
    },
  }
}