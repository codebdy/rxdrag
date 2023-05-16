import React, { ReactNode } from "react"
import { memo, useCallback } from "react"
import { useGraph, useDnd, useTrans, useGetNodeConfig } from "../../hooks";
import { IActivityMaterial, IActivityDefine } from "@rxdrag/schema";
import { createUuid } from "@rxdrag/shared";

export type ReactionResourceProps = {
  children?: (onMouseDown: ((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void)) => ReactNode,
  material: IActivityMaterial<React.ReactNode>,
}

export const ReactionResource = memo((props: ReactionResourceProps) => {
  const { children, material } = props
  const t = useTrans();
  const graph = useGraph()
  const dnd = useDnd()
  const getNodeConfig = useGetNodeConfig()

  const handleDrag = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!graph) {
      return;
    }
    const nodeMeta: IActivityDefine = {
      id: createUuid(),
      label: t(material.label),
      type: material.reactionType,
      materialName: material.name,
      ...material.meta
    }
    const node = graph.createNode(getNodeConfig(nodeMeta));
    dnd?.start(node, e.nativeEvent as any);
  }, [dnd, getNodeConfig, graph, t])

  return <>
    {children?.(handleDrag)}
  </>
})
