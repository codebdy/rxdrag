import { useCallback } from "react";
import { useGetMaterial } from "./useGetMaterial";
import { INodeDefine } from "@rxdrag/minions-schema";
import { useLogicFlowContext } from "./useLogicFlowContext";

export function useGetSubLabel() {
  const getMaterial = useGetMaterial()
  const logicContext = useLogicFlowContext();

  const getLabel = useCallback((nodeMeta: INodeDefine<unknown>) => {
    const material = getMaterial(nodeMeta.activityName)
    const subTitle = material?.subTitle?.(nodeMeta.config, logicContext)
    return subTitle
  }, [getMaterial, logicContext])

  return getLabel
}