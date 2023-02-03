import { useToken } from "antd/es/theme/internal"
import { useCallback } from "react"
import { IReactionMaterial } from "runner/reaction/interfaces/material"
import { IConfigMeta, IReactionNodeMeta } from "runner/reaction/interfaces/metas"
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
  const getNodeConfig = useCallback((nodeMeta: IReactionNodeMeta<IConfigMeta>, material: IReactionMaterial | undefined) => {
    const subLabel = getSubLabel(nodeMeta)
    const height = getHeight(nodeMeta, !!subLabel)
    const width = getNodeWidth(nodeMeta, subLabel)
    console.log("哈哈 useGetControllerReactionConfig", subLabel)
    return {
      id: nodeMeta.id,
      shape: "reaction-node",
      x: nodeMeta.x6Node?.x || 340,
      y: nodeMeta.x6Node?.y || 240,
      width: nodeMeta.x6Node?.width || width,
      height: nodeMeta.x6Node?.height || height,
      data: {
        meta: nodeMeta,
        backgroundColor: token.colorBgContainer,
        color: token.colorTextSecondary,
        material,
        token,
        width: width,
        height: height,
        subLabel: subLabel,
      },
      ports: {
        groups: portsGroup,
        items: transformPorts(nodeMeta)
      },
    }
  }, [getHeight, getNodeWidth, getSubLabel, portsGroup, token, transformPorts])

  return getNodeConfig
}