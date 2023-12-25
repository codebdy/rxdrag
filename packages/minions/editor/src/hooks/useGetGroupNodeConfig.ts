import { useCallback } from "react";
import { IActivityNode, IThemeToken } from "../interfaces";
import { useTransformPorts } from "./useTransformPorts";
import { useGroupPortsConfig } from "./useGroupPortsConfig";

export const GroupSize = {
  width:360,
  height:160,
}

export function useGetGroupNodeConfig(token: IThemeToken) {
  const portsGroup = useGroupPortsConfig(token)
  const transformPorts = useTransformPorts()

  const getGroup = useCallback((nodeMeta: IActivityNode) => {
    return {
      id: nodeMeta.id,
      shape: 'group-node',
      x: nodeMeta.x6Node?.x || 340,
      y: nodeMeta.x6Node?.y || 240,
      stroke: token?.colorBorder,
      width: nodeMeta.x6Node?.width || GroupSize.width,
      height: nodeMeta.x6Node?.height || GroupSize.height,
      label: nodeMeta.label || "Group",
      attrs: {
        body: {
          //fill: token.colorBgContainer,//"#8297da",
          stroke: token.colorText,//stroke: '#5e76c3',
          strokeWidth: 1,
          class: "group-node",
        },
        label: {
          fill: token.colorTextSecondary,
          refX: 0.5,
          refY: '100%',
          refY2: -8,
          textAnchor: 'middle',
          textVerticalAnchor: 'bottom',
        },
      },
      data: {
        meta: nodeMeta,
      },
      ports: {
        groups: portsGroup,
        items: transformPorts(nodeMeta)
      },
    }
  }, [portsGroup, token.colorBorder, token.colorText, token.colorTextSecondary, transformPorts])

  return getGroup
}