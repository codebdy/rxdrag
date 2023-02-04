import { useCallback } from "react"
import { IReactionMaterial } from "runner/reaction/interfaces/material"
import { IConfigMeta, IReactionNodeMeta } from "runner/reaction/interfaces/metas"
import { useTransformPorts } from "./useTransformPorts"
import { useToken } from "antd/es/theme/internal"
import { usePortsConfig } from "./usePortsConfig"
import { useGetNodeWidth } from "./useGetNodeWidth"
import { useGetNodeHeight } from "./useGetNodeHeight"

export function useGetSingleNodeConfig() {
  const [, token] = useToken()
  const transformPorts = useTransformPorts()
  const portsGroup = usePortsConfig()
  const getNodeWidth = useGetNodeWidth()
  const getHeight = useGetNodeHeight()
  const getSingleNodeConfig = useCallback((nodeMeta: IReactionNodeMeta<IConfigMeta>, material: IReactionMaterial | undefined) => {
    const height = getHeight(nodeMeta, false)
    const width = getNodeWidth(nodeMeta)
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
      },
      ports: {
        groups: portsGroup,
        items: transformPorts(nodeMeta)
      },
    }
  }, [getHeight, getNodeWidth, portsGroup, token, transformPorts])

  return getSingleNodeConfig
}
