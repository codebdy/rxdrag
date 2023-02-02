import { useToken } from "antd/es/theme/internal";
import { useCallback } from "react";
import { IPortMeta } from "runner/reaction/interfaces/metas";
import { useTrans } from "./useTrans";

export function useTransformPorts() {
  const [, token] = useToken()
  const t = useTrans()
  const doTransform = useCallback((ports: IPortMeta[] | undefined, group: 'in' | 'out') => {
    return ports?.map(
      port => ({
        id: port.name,
        name: port.name,
        group: group,
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
            name: group === 'out' ? 'right' : 'left', // 标签位置计算方法的名称,
          }
        }
      })
    )
  }, [t, token.colorTextSecondary])

  const transform = useCallback((inPorts: IPortMeta[] | undefined, outPorts: IPortMeta[] | undefined,) => {
    const ins = doTransform(inPorts, 'in') || []
    const outs = doTransform(outPorts, 'out') || []
    return [...ins, ...outs]
  }, [doTransform])

  return transform
}