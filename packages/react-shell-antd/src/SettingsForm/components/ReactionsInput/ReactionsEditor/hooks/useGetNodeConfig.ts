import { useCallback } from "react";
import { Node } from "@antv/x6";
import { useToken } from "antd/es/theme/internal";
import { IConfigMeta, IReactionMeta, ReactionType } from "runner/minions/interfaces/metas";
import { getStartNodeConfig } from "./getStartNodeConfig";
import { getEndNodeConfig } from "./getEndNodeConfig";
import { useGetMaterial } from "./useGetMaterial";
import { useGetSingleNodeConfig } from "./useGetSingleNodeConfig";
import { useGetControllerReactionConfig } from "./useGetControllerReactionConfig";

export function useGetNodeConfig() {
  const [, token] = useToken()
  const getMaterial = useGetMaterial();
  const getSingleNodeConfig = useGetSingleNodeConfig()
  const getReactionNodeConfig = useGetControllerReactionConfig()

  const getConfig = useCallback((reactNodeMeta: IReactionMeta<IConfigMeta>): Node.Metadata => {
    switch (reactNodeMeta.type) {
      case ReactionType.Start:
        return getStartNodeConfig(reactNodeMeta, token)
      case ReactionType.End:
        return getEndNodeConfig(reactNodeMeta, token)
      case ReactionType.SingleReaction:
        return getSingleNodeConfig(reactNodeMeta, getMaterial(reactNodeMeta.materialName))
      case ReactionType.ControllerDefaultReaction:
      case ReactionType.ControllerReaction:
        return getReactionNodeConfig(reactNodeMeta, getMaterial(reactNodeMeta.materialName))
    }

    throw new Error("Can not find reaction node meta: " + reactNodeMeta.type)
  }, [getReactionNodeConfig, getMaterial, getSingleNodeConfig, token])


  return getConfig
}