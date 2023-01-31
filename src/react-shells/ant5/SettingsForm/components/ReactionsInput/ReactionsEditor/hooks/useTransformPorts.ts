import { useToken } from "antd/es/theme/internal";
import { useCallback } from "react";
import { IPortMeta } from "runner/reaction/interfaces/metas";
import { useTrans } from "./useTrans";

export function useTransformPorts() {
  const [, token] = useToken()
  const t = useTrans()
  const transform = useCallback((ports?: IPortMeta[]) => {
    return ports?.map(
      port => ({
        id: port.name,
        name: port.name,
        group: port.group,
        attrs: {
          text: {
            text: t(port.label),
            fill: token.colorTextSecondary,
            fontSize: 12,
          },
        },
        label: {
          position: {
            // 标签位置
            name: port.group === 'out' ? 'right' : 'in', // 标签位置计算方法的名称,
          }
        }
      })
    )
  }, [t, token.colorTextSecondary])

  return transform
}