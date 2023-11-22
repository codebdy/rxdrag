import { IActivityNode, IThemeToken } from "../interfaces"

const STROKE_WIDTH = 2
export const getStartNodeConfig = (nodeMeta: IActivityNode, token: IThemeToken) => {
  return {
    id: nodeMeta.id,
    shape: 'circle',
    ...nodeMeta.x6Node,
    x: nodeMeta.x6Node?.x || 90,
    y: nodeMeta.x6Node?.y || 60,
    width: nodeMeta.x6Node?.width || 20,
    height: nodeMeta.x6Node?.height || 20,
    label: nodeMeta.label,
    data: { meta: nodeMeta },
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