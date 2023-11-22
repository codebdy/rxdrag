import { ITreeNode } from "@rxdrag/core";
import { useCurrentNode, useGetNode } from "@rxdrag/react-core";
import { useCallback, useEffect, useState } from "react";
import { IModelMeta, ModelType } from "../ModuleUiDesigner/interfaces";
import { useGetEntity } from "./useGetEntity";
import { EntityMeta } from "../ModuleUiDesigner/interfaces/EntityMeta";

export function useRecentEntity() {
  const [entity, setEntity] = useState<EntityMeta>()
  const node = useCurrentNode()

  const getNode = useGetNode()
  const getEntity = useGetEntity()
  const getEntityId = useCallback((node?: ITreeNode | null) => {
    const modelMeta = node?.meta?.["x-data"] as IModelMeta | undefined
    if (modelMeta?.modelMetaId) {
      if (modelMeta.modelType === ModelType.Entity) {
        return modelMeta?.modelMetaId
      } else if (modelMeta.modelType === ModelType.Association) {
        const [, entityId] = modelMeta.modelMetaId.split(":")
        return entityId
      }
    }
    if (node?.parentId) {
      const parent = getNode(node?.parentId)
      if (parent) {
        return getEntityId(parent)
      }
    }

  }, [getNode])

  useEffect(() => {
    const parent = getNode(node?.parentId)
    setEntity(getEntity(getEntityId(parent)))
  }, [getEntity, getEntityId, getNode, node])

  return entity
}