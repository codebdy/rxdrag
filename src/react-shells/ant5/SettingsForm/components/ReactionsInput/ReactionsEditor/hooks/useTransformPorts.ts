import { useToken } from "antd/es/theme/internal";
import { useCallback } from "react";
import { IPortMeta, IReactionMeta, ReactionType } from "runner/reaction/interfaces/metas";
import { useGetControllerReactionPorts } from "./useGetControllerReactionPorts";
import { useTrans } from "./useTrans";

export function useTransformPorts() {
  const [, token] = useToken()
  const t = useTrans()
  const getControllerPorts = useGetControllerReactionPorts();
  const doTransform = useCallback((ports: IPortMeta[] | undefined, group: 'in' | 'out') => {
    return ports?.map(
      port => ({
        id: port.id,
        //name: port.name,
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

  const transform = useCallback((meta: IReactionMeta) => {
    if (meta.type === ReactionType.ControllerReaction) {
      const ins = doTransform(getControllerPorts(meta, 'in'), 'in')||[]
      const outs = doTransform(getControllerPorts(meta, 'out'), 'out')||[]
      return [...ins, ...outs]
    } else {
      const ins = doTransform(meta.inPorts, 'in') || []
      const outs = doTransform(meta.outPorts, 'out') || []
      return [...ins, ...outs]
    }
  }, [doTransform, getControllerPorts])

  return transform
}