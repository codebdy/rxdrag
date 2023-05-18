import { IActivityDefine, IConfigMeta } from "@rxdrag/schema"
import { GlobalToken } from "antd/es/theme/interface"

const STROKE_WIDTH = 2
export const getStartNodeConfig = (nodeMeta: IActivityDefine<IConfigMeta>, token: GlobalToken) => {
  return {
    id: nodeMeta.id,
    shape: 'circle',
    x: 90,
    y: 60,
    width: 20,
    height: 20,
    ...nodeMeta.x6Node,
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