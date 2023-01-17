import { useCallback } from "react";
import { IStartNodeMeta } from "runner/reaction/metas";
import { Node } from "@antv/x6";
import { useToken } from "antd/es/theme/internal";

const STROKE_WIDTH = 2
export function useGetStartNodeConfig() {
  const [, token] = useToken()
  const getConfig = useCallback((nodeMeta: IStartNodeMeta): Node.Metadata => {
    return {
      shape: 'circle',
      x: 90,
      y: 60,
      width: 20,
      height: 20,
      ...nodeMeta.x6Node,
      id: nodeMeta.uuid,
      label: nodeMeta.label,
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
            id: nodeMeta.uuid + '-port',
            group: 'out',
            args: {
              dx: 10,
            }
          },
        ],
      }
    }
  }, [token.colorText, token.colorTextSecondary])


  return getConfig
}