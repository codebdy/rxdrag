import { ITreeNode } from "@rxdrag/core";
import { useCurrentNode, useGetNode } from "@rxdrag/react-core";
import { useCallback } from "react";
import { IModelMeta, ModelType } from "../ModuleUiDesigner/interfaces";

export function useRecentEntityId() {
  const node = useCurrentNode()
  const getNode = useGetNode()
  const getEntityId = useCallback((node?: ITreeNode | null) => {
    const modelMeta = node?.meta?.["x-data"] as IModelMeta | undefined
    if (modelMeta?.modelMetaId && modelMeta.type === ModelType.Entity) {
      return modelMeta?.modelMetaId
    }else{
      if(node?.parentId){
        const parent = getNode(node?.parentId)
        if(parent){
          return getEntityId(parent)
        }
      }
    }
  }, [getNode])

  return getEntityId(node)
}