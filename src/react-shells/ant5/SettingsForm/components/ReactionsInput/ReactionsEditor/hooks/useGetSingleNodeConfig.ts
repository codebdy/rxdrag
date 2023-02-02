import { useCallback } from "react"
import { IReactionMaterial } from "runner/reaction/interfaces/material"
import { IReactionNodeMeta } from "runner/reaction/interfaces/metas"
import { useTransformPorts } from "./useTransformPorts"
import { useToken } from "antd/es/theme/internal"
import { usePortsConfig } from "./usePortsConfig"
import { useGetSingleNodeWidth } from "./useGetSingleNodeWidth"

export function useGetSingleNodeConfig() {
  const [, token] = useToken()
  const transformPorts = useTransformPorts()
  const portsGroup = usePortsConfig()
  const getNodeWidth = useGetSingleNodeWidth()
  const getSingleNodeConfig = useCallback((nodeMeta: IReactionNodeMeta, material: IReactionMaterial | undefined) => {
    const height = 40
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
        items: transformPorts(nodeMeta.inPorts, nodeMeta.outPorts)
      },
    }
  }, [getNodeWidth, portsGroup, token, transformPorts])

  return getSingleNodeConfig
}
