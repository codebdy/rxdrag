import { IPortDefine, IActivityDefine } from "@rxdrag/minions-schema";
import { useCallback } from "react";
import { useThemeToken } from "./useThemeToken";

export function useTransformPorts() {
  const token = useThemeToken()
  //const getControllerPorts = useGetControllerReactionPorts();
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
            text: port.label,
            fill: token.colorTextSecondary,
            fontSize: 12,
          },
          bg: {
            ref: "text",
            refWidth: "100%",
            refHeight: "100%",
            refX: group === 'out' ? 15 : -50,
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
  }, [token.colorBgContainer, token.colorTextSecondary])

  const transform = useCallback((meta: IActivityDefine) => {
    // if (meta.type === ActivityType.ControllerReaction) {
    //   const ins = doTransform(getControllerPorts(meta, 'in'), 'in') || []
    //   const outs = doTransform(getControllerPorts(meta, 'out'), 'out') || []
    //   return [...ins, ...outs]
    // } else {
    //   const ins = doTransform(meta.inPorts, 'in') || []
    //   const outs = doTransform(meta.outPorts, 'out') || []
    //   return [...ins, ...outs]
    // }
    const ins = doTransform(meta.inPorts, 'in') || []
    const outs = doTransform(meta.outPorts, 'out') || []
    return [...ins, ...outs]
  }, [doTransform])

  return transform
}