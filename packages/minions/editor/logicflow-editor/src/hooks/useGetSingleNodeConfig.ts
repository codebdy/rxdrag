import { useCallback } from "react"
import { useTransformPorts } from "./useTransformPorts"
import { usePortsConfig } from "./usePortsConfig"
import { useGetNodeWidth } from "./useGetNodeWidth"
import { useGetNodeHeight } from "./useGetNodeHeight"
import { useGetSubLabel } from "./useGetSubLabel"
import { useThemeToken } from "./useThemeToken"
import { IActivityNode } from "../interfaces"
import { IActivityMaterial } from "@rxdrag/minions-schema"
import { useGetTitle } from "./useGetTitle"
import { isFunction } from "lodash"
import { useLogicFlowContext } from "./useLogicFlowContext"

export function useGetSingleNodeConfig() {
  const token = useThemeToken()
  const logicContext = useLogicFlowContext();
  const transformPorts = useTransformPorts()
  const portsGroup = usePortsConfig(token)
  const getNodeWidth = useGetNodeWidth()
  const getSubLabel = useGetSubLabel()
  const getTitle = useGetTitle()
  const getHeight = useGetNodeHeight()
  const getSingleNodeConfig = useCallback((nodeMeta: IActivityNode, material: IActivityMaterial | undefined) => {
    const subLabel = getSubLabel(nodeMeta)
    const title = getTitle(nodeMeta)
    const height = getHeight(nodeMeta, !!subLabel)
    const width = getNodeWidth(nodeMeta, title, subLabel)
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
        icon: isFunction(material?.icon) ? material?.icon(nodeMeta.config, logicContext) : material?.icon,
        iconColor: isFunction(material?.color) ? material?.color(nodeMeta.config, logicContext) : material?.color,
        token,
        width: width,
        height: height,
        title: title,
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
  }, [getHeight, getNodeWidth, getSubLabel, getTitle, logicContext, portsGroup, token, transformPorts])

  return getSingleNodeConfig
}
