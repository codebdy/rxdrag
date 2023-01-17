import { useCallback } from "react";
import { IEndNodeMeta } from "runner/reaction/metas";
import { Node } from "@antv/x6";
import { useToken } from "antd/es/theme/internal";

const STROKE_WIDTH = 5
export function useGetEndNodeConfig() {
  const [, token] = useToken()
  const getConfig = useCallback((nodeMeta: IEndNodeMeta): Node.Metadata => {
    return {
      shape: 'circle',
      x: 700,
      y: 200,
      width: 20,
      height: 20,
      ...nodeMeta.x6Node,
      id: nodeMeta.uuid,
      label: nodeMeta.label,
      attrs: {
        body: {
          fill: token.colorBgBase,
          stroke: token.colorText,
          strokeWidth: STROKE_WIDTH,
        },
        label: {
          refX: '100%',
          refX2: 10,
          refY: 0.5,
          textAnchor: 'start',
          textVerticalAnchor: 'middle',
          fill: token.colorText,
        },
      },
      ports: {
        groups: {
          out: {
            attrs: {
              circle: {
                r: 10,
                magnet: true,
                stroke: token.colorText,
                fill: token.colorBgBase,
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
  }, [token.colorBgBase, token.colorText])


  return getConfig
}