import { useCallback } from "react"
import { useTransformPorts } from "./useTransformPorts"
import { usePortsConfig } from "./usePortsConfig"
import { useGetNodeWidth } from "./useGetNodeWidth"
import { useGetNodeHeight } from "./useGetNodeHeight"
import { useGetSubLabel } from "./useGetSubLabel"
import { useThemeToken } from "./useThemeToken"
import { IActivityNode } from "../interfaces"
import { IActivityMaterial } from "@rxdrag/minions-schema"

export function useGetSingleNodeConfig() {
  const token = useThemeToken()
  const transformPorts = useTransformPorts()
  const portsGroup = usePortsConfig()
  const getNodeWidth = useGetNodeWidth()
  const getSubLabel = useGetSubLabel()
  const getHeight = useGetNodeHeight()
  const getSingleNodeConfig = useCallback((nodeMeta: IActivityNode, material: IActivityMaterial | undefined) => {
    const subLabel = getSubLabel(nodeMeta)
    const height = getHeight(nodeMeta, !!subLabel)
    const width = getNodeWidth(nodeMeta)
    const config = {
      id: nodeMeta.id,
      shape: "reaction-node",
      x: nodeMeta.x6Node?.x || 340,
      y: nodeMeta.x6Node?.y || 240,
      width: width,
      height: height,
      data: {
        meta: nodeMeta,
        backgroundColor: token.colorBgContainer,
        color: token.colorTextSecondary,
        material,
        token,
        width: width,
        height: height,
        subLabel,
        inputCounts: nodeMeta.inPorts?.length,
        outputCounts: nodeMeta.outPorts?.length,
      },
      ports: {
        groups: portsGroup,
        items: transformPorts(nodeMeta)
      },
    }
    return config
  }, [getHeight, getNodeWidth, getSubLabel, portsGroup, token, transformPorts])

  return getSingleNodeConfig
}
