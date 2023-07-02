import { useCallback } from "react";
import { Node } from "@antv/x6";
import { getStartNodeConfig } from "./getStartNodeConfig";
import { getEndNodeConfig } from "./getEndNodeConfig";
import { useGetMaterial } from "./useGetMaterial";
import { useGetSingleNodeConfig } from "./useGetSingleNodeConfig";
import { IActivityNode } from "../interfaces";
import { ActivityType } from "@rxdrag/minions-schema";
import { useThemeToken } from "./useThemeToken";
import { useGetLogicFlowNodeConfig } from "./useGetLogicFlowNodeConfig";

export function useGetNodeConfig() {
  const getMaterial = useGetMaterial();
  const getSingleNodeConfig = useGetSingleNodeConfig()
  const token = useThemeToken()
  const getLogicFlowNodeConfig = useGetLogicFlowNodeConfig(token)

  const getConfig = useCallback((reactNodeMeta: IActivityNode): Node.Metadata => {
    switch (reactNodeMeta.type) {
      case ActivityType.Start:
        return getStartNodeConfig(reactNodeMeta, token)
      case ActivityType.End:
        return getEndNodeConfig(reactNodeMeta, token)
      case ActivityType.Activity:
        return getSingleNodeConfig(reactNodeMeta, getMaterial(reactNodeMeta.activityName))
      case ActivityType.LogicFlowActivity:
        return getLogicFlowNodeConfig(reactNodeMeta, getMaterial(reactNodeMeta.activityName))
    }

    throw new Error("Can not find reaction node meta: " + reactNodeMeta.type)
  }, [getMaterial, getLogicFlowNodeConfig, getSingleNodeConfig, token])


  return getConfig
}