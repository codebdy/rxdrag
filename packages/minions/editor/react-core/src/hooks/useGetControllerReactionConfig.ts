import { IConfigMeta, IActivityMaterial, IActivityDefine } from "@rxdrag/schema"
import { useToken } from "antd/es/theme/internal"
import { useCallback } from "react"
import { useGetNodeHeight } from "./useGetNodeHeight"
import { useGetNodeWidth } from "./useGetNodeWidth"
import { useGetSubLabel } from "./useGetSubLabel"
import { usePortsConfig } from "./usePortsConfig"
import { useTransformPorts } from "./useTransformPorts"

export function useGetControllerReactionConfig() {
  const [, token] = useToken()
  const transformPorts = useTransformPorts()
  const portsGroup = usePortsConfig()
  const getNodeWidth = useGetNodeWidth()
  const getHeight = useGetNodeHeight()
  const getSubLabel = useGetSubLabel()
  const getNodeConfig = useCallback((nodeMeta: IActivityDefine<IConfigMeta>, material: IActivityMaterial | undefined) => {
    const subLabel = getSubLabel(nodeMeta)
    const height = getHeight(nodeMeta, !!subLabel)
    const width = getNodeWidth(nodeMeta, subLabel)
    const ports = transformPorts(nodeMeta)
    return {
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
        subLabel: subLabel,
        inputCounts: nodeMeta.inPorts?.length || ports.filter(port => port.group === 'in').length,
        outputCounts: nodeMeta.outPorts?.length || ports.filter(port => port.group === 'out').length,
      },
      ports: {
        groups: portsGroup,
        items: ports
      },
    }
  }, [getHeight, getNodeWidth, getSubLabel, portsGroup, token, transformPorts])

  return getNodeConfig
}