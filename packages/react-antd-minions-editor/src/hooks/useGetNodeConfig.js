import { useCallback } from "react";
import { useToken } from "antd/es/theme/internal";
import { getStartNodeConfig } from "./getStartNodeConfig";
import { getEndNodeConfig } from "./getEndNodeConfig";
import { useGetMaterial } from "./useGetMaterial";
import { useGetSingleNodeConfig } from "./useGetSingleNodeConfig";
import { useGetControllerReactionConfig } from "./useGetControllerReactionConfig";
import { ActivityType } from "@rxdrag/schema";
export function useGetNodeConfig() {
    const [, token] = useToken();
    const getMaterial = useGetMaterial();
    const getSingleNodeConfig = useGetSingleNodeConfig();
    const getReactionNodeConfig = useGetControllerReactionConfig();
    const getConfig = useCallback((reactNodeMeta) => {
        switch (reactNodeMeta.type) {
            case ActivityType.Start:
                return getStartNodeConfig(reactNodeMeta, token);
            case ActivityType.End:
                return getEndNodeConfig(reactNodeMeta, token);
            case ActivityType.SingleReaction:
                return getSingleNodeConfig(reactNodeMeta, getMaterial(reactNodeMeta.materialName));
            case ActivityType.ControllerDefaultReaction:
            case ActivityType.ControllerReaction:
                return getReactionNodeConfig(reactNodeMeta, getMaterial(reactNodeMeta.materialName));
        }
        throw new Error("Can not find reaction node meta: " + reactNodeMeta.type);
    }, [getReactionNodeConfig, getMaterial, getSingleNodeConfig, token]);
    return getConfig;
}
