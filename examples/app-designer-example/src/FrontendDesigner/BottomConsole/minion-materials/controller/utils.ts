import { IControllerMeta, IPropConfig } from "@rxdrag/minions-runtime-react";
import { LogicflowContextParam } from "../../types";
import { ITreeNode } from "@rxdrag/core";
import { IMaterial } from "@rxdrag/react-core";

export function getControllerComponentInfo(config?: IPropConfig, context?: LogicflowContextParam) {
  const engine = context?.engine
  const nodes = engine?.getMonitor().getState().nodesById
  let node: ITreeNode | undefined = undefined
  for (const key of Object.keys(nodes || {})) {
    const nd = nodes?.[key]

    if ((nd?.meta?.["x-controller"] as IControllerMeta | undefined)?.id === config?.param?.controllerId && config?.param?.controllerId) {
      node = nd
    }
  }

  const material: IMaterial | undefined = node?.meta.componentName ? engine?.getComponentManager().getComponentConfig(node?.meta.componentName) as IMaterial | undefined : undefined

  return { node, material }
}