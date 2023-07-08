import { useCallback } from "react";
import { IActivityNode, IThemeToken } from "../interfaces";
import { IActivityMaterial } from "@rxdrag/minions-schema";
import { useTransformPorts } from "./useTransformPorts";
import { useGroupPortsConfig } from "./useGroupPortsConfig";

export function useGetGroupNodeConfig(token: IThemeToken) {
  const portsGroup = useGroupPortsConfig(token)
  const transformPorts = useTransformPorts()

  const getGroup = useCallback((nodeMeta: IActivityNode, material: IActivityMaterial | undefined) => {
    return {
      id: nodeMeta.id,
      shape: 'group-node',
      x: nodeMeta.x6Node?.x || 340,
      y: nodeMeta.x6Node?.y || 240,
      stroke: token.colorBorder,
      width: nodeMeta.x6Node?.width || 360,
      height: nodeMeta.x6Node?.height || 160,
      zIndex: 1,
      label: nodeMeta.label || "Group",
      attrs: {
        body: {
          fill: token.colorBgContainer,//"#8297da",
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
  }, [token, transformPorts])

  return getGroup
}