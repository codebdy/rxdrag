import { MethodOperateType } from "UmlEditor/meta";
import { graphLogicsState } from "UmlEditor/recoil/atoms";
import { useMemo } from "react";
import { useRecoilValue } from "recoil";
import { ID } from "shared";

export function useSubLogicFlows(metaId: ID){
  const graphLogics = useRecoilValue(graphLogicsState(metaId));

  const subFlows = useMemo(()=>{
    return graphLogics.filter(flow=>flow.operateType === MethodOperateType.SubMethod)
  }, [graphLogics])

  return subFlows
}
