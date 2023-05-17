import React, { ReactNode } from "react"
import { memo, useCallback } from "react"
import { useGraph, useDnd, useGetNodeConfig } from "../../hooks";
import { createUuid } from "@rxdrag/shared";
import { IActivityDefine, IActivityMaterial } from "@rxdrag/minions";

export type ReactionResourceProps = {
  children?: (onMouseDown: ((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void)) => ReactNode,
  material: IActivityMaterial<React.ReactNode>,
}

export const ReactionResource = memo((props: ReactionResourceProps) => {
  const { children, material } = props
  const graph = useGraph()
  const dnd = useDnd()
  const getNodeConfig = useGetNodeConfig()

  const handleDrag = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!graph) {
      return;
    }
    const nodeMeta: IActivityDefine = {
      id: createUuid(),
      label: material.label,
      type: material.activityType,
      activityName: material.name,
      ...material.defaultPorts
    }
    const node = graph.createNode(getNodeConfig(nodeMeta));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dnd?.start(node, e.nativeEvent as any);
  }, [dnd, getNodeConfig, graph, material.activityType, material.defaultPorts, material.label, material.name])

  return <>
    {children?.(handleDrag)}
  </>
})
