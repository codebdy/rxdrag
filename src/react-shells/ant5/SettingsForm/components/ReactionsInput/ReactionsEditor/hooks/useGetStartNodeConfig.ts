import { useCallback } from "react";
import { IStartNodeMeta } from "runner/reaction/metas";
import { Node } from "@antv/x6";
import { useToken } from "antd/es/theme/internal";

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
          fill: token.colorBgBase,
          stroke: token.colorText,
          strokeWidth: 2,
        },
        label: {
          refX: '-10',
          refY: 0.5,
          textAnchor: 'end',
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
                strokeWidth: 2,
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


  return  getConfig
}