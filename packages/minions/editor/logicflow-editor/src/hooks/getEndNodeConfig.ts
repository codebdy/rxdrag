import { IActivityNode, IThemeToken } from "../interfaces"

const STROKE_WIDTH = 5
export const getEndNodeConfig = (nodeMeta: IActivityNode, token: IThemeToken) => {
  return {
    id: nodeMeta.id,
    shape: 'circle',
    ...nodeMeta.x6Node,
    x: nodeMeta.x6Node?.x || 700,
    y: nodeMeta.x6Node?.y || 200,
    width: nodeMeta.x6Node?.width || 20,
    height: nodeMeta.x6Node?.height || 20,
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