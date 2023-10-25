import { IPortDefine, INodeDefine } from "@rxdrag/minions-schema";
import { useCallback } from "react";
import { useThemeToken } from "./useThemeToken";
import { useTranslate } from "@rxdrag/react-locales";

export function useTransformPorts() {
  const token = useThemeToken()
  const t = useTranslate()
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
            text: (port.label?.startsWith("$") ? t(port.label.substring(1)) : port.label) || "",
            fill: token.colorTextSecondary,
            fontSize: 12,
          },
          //标签背景，位置对不好，暂时注掉
          //bg: {
          //  ref: "text",
          //  refWidth: "100%",
          //  refHeight: "100%",
          //  refX: group === 'out' ? 15 : -50,
          //refX2: group === 'out' ? 28 : -12,
          //  refY: -6,
          //fill: token.colorBgContainer,
          //}
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

  const transform = useCallback((meta: INodeDefine) => {
    const ins = doTransform(meta.inPorts, 'in') || []
    const outs = doTransform(meta.outPorts, 'out') || []
    return [...ins, ...outs]
  }, [doTransform])

  return transform
}