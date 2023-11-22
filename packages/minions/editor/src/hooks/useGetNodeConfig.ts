import { useCallback } from "react";
import { Node } from "@antv/x6";
import { getStartNodeConfig } from "./getStartNodeConfig";
import { getEndNodeConfig } from "./getEndNodeConfig";
import { useGetMaterial } from "./useGetMaterial";
import { useGetSingleNodeConfig } from "./useGetSingleNodeConfig";
import { IActivityNode } from "../interfaces";
import { NodeType } from "@rxdrag/minions-schema";
import { useThemeToken } from "./useThemeToken";
import { useGetLogicFlowNodeConfig } from "./useGetLogicFlowNodeConfig";
import { useGetGroupNodeConfig } from "./useGetGroupNodeConfig";

export function useGetNodeConfig() {
  const getMaterial = useGetMaterial();
  const getSingleNodeConfig = useGetSingleNodeConfig()
  const token = useThemeToken()
  const getLogicFlowNodeConfig = useGetLogicFlowNodeConfig(token)
  const getGroupNodeConfig = useGetGroupNodeConfig(token)

  const getConfig = useCallback((reactNodeMeta: IActivityNode): Node.Metadata => {
    switch (reactNodeMeta.type) {
      case NodeType.Start:
        return getStartNodeConfig(reactNodeMeta, token)
      case NodeType.End:
        return getEndNodeConfig(reactNodeMeta, token)
      case NodeType.Activity:
        return getSingleNodeConfig(reactNodeMeta, getMaterial(reactNodeMeta.activityName))
      case NodeType.LogicFlowActivity:
        return getLogicFlowNodeConfig(reactNodeMeta, getMaterial(reactNodeMeta.activityName))
      case NodeType.EmbeddedFlow:
        return getGroupNodeConfig(reactNodeMeta)
    }

  }, [token, getSingleNodeConfig, getMaterial, getLogicFlowNodeConfig, getGroupNodeConfig])


  return getConfig
}