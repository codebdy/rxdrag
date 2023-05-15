import { IPortDefine, IActivityDefine, ActivityType } from "@rxdrag/schema";
import { useToken } from "antd/es/theme/internal";
import { useCallback } from "react";
import { useGetControllerReactionPorts } from "./useGetControllerReactionPorts";
import { useTrans } from "./useTrans";

export function useTransformPorts() {
  const [, token] = useToken()
  const t = useTrans()
  const getControllerPorts = useGetControllerReactionPorts();
  const doTransform = useCallback((ports: IPortDefine[] | undefined, group: 'in' | 'out') => {
    return ports?.map(
      port => ({
        id: port.id,
        //name: port.name,
        markup: [
          { tagName: "circle", selector: "bopdy" },
          { tagName: "rect", selector: "bg" }
        ],
        group: group,
        attrs: {
          text: {
            text: t(port.label),
            fill: token.colorTextSecondary,
            fontSize: 12,
          },
          bg: {
            ref: "text",
            refWidth: "100%",
            refHeight: "100%",
            refX: group === 'out' ? 15 : -40,
            //refX2: group === 'out' ? 28 : -12,
            refY: -6,
            fill: token.colorBgContainer,
          }
        },
        label: {
          position: {
            // 标签位置
            name: group === 'out' ? 'right' : 'left', // 标签位置计算方法的名称,
          }
        }
      })
    )
  }, [t, token.colorBgContainer, token.colorTextSecondary])

  const transform = useCallback((meta: IActivityDefine) => {
    if (meta.type === ActivityType.ControllerReaction) {
      const ins = doTransform(getControllerPorts(meta, 'in'), 'in') || []
      const outs = doTransform(getControllerPorts(meta, 'out'), 'out') || []
      return [...ins, ...outs]
    } else {
      const ins = doTransform(meta.inPorts, 'in') || []
      const outs = doTransform(meta.outPorts, 'out') || []
      return [...ins, ...outs]
    }
  }, [doTransform, getControllerPorts])

  return transform
}