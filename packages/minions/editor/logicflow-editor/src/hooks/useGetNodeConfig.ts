import { useCallback } from "react";
import { Node } from "@antv/x6";
import { getStartNodeConfig } from "./getStartNodeConfig";
import { getEndNodeConfig } from "./getEndNodeConfig";
import { useGetMaterial } from "./useGetMaterial";
import { useGetSingleNodeConfig } from "./useGetSingleNodeConfig";
import { IActivityNode } from "../interfaces";
import { ActivityType } from "@rxdrag/minions-schema";
import { useThemeToken } from "./useThemeToken";

export function useGetNodeConfig() {
  const getMaterial = useGetMaterial();
  const getSingleNodeConfig = useGetSingleNodeConfig()
  const token = useThemeToken()
  // const getReactionNodeConfig = useGetControllerReactionConfig()

  const getConfig = useCallback((reactNodeMeta: IActivityNode): Node.Metadata => {
    switch (reactNodeMeta.type) {
      case ActivityType.Start:
        return getStartNodeConfig(reactNodeMeta, token)
      case ActivityType.End:
        return getEndNodeConfig(reactNodeMeta, token)
      case ActivityType.Activity:
        return getSingleNodeConfig(reactNodeMeta, getMaterial(reactNodeMeta.materialName))
      // case ActivityType.ControllerDefaultReaction:
      // case ActivityType.ControllerReaction:
      //   return getReactionNodeConfig(reactNodeMeta, getMaterial(reactNodeMeta.materialName))
    }

    throw new Error("Can not find reaction node meta: " + reactNodeMeta.type)
  }, [getMaterial, getSingleNodeConfig, token])


  return getConfig
}