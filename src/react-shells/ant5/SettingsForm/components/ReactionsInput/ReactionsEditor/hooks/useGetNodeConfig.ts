import { useCallback } from "react";
import { Node } from "@antv/x6";
import { useToken } from "antd/es/theme/internal";
import { IReactionNodeMeta, ReactionType } from "runner/reaction/interfaces/metas";
import { getStartNodeConfig } from "./getStartNodeConfig";
import { getEndNodeConfig } from "./getEndNodeConfig";

export function useGetNodeConfig() {
  const [, token] = useToken()
  const getConfig = useCallback((reactNodeMeta: IReactionNodeMeta): Node.Metadata => {
    switch (reactNodeMeta.type) {
      case ReactionType.Start:
        return getStartNodeConfig(reactNodeMeta, token)
      case ReactionType.End:
        return getEndNodeConfig(reactNodeMeta, token)
    }

    throw new Error("Can not find reaction node meta: " + reactNodeMeta.type)
  }, [token])


  return getConfig
}