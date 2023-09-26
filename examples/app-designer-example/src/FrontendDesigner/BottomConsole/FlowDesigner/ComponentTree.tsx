import { Tree } from "antd";
import { DataNode } from "antd/es/tree";
import { memo, useCallback, useMemo } from "react"
import { TreeContainer } from "../common/TreeContainer";
import { useModule } from "../../hooks/useModule";
import { useDesignerEngine, useGetNode } from "@rxdrag/react-core";
import { ITreeNode } from "@rxdrag/core"
import { IControllerMeta } from "@rxdrag/minions-runtime-react";

const { DirectoryTree } = Tree;

export type ReactionableNode = {
  node: ITreeNode<unknown, IControllerMeta>,
  children?: ReactionableNode[]
}

export const ComponentTree = memo(() => {
  const module = useModule()
  const engine = useDesignerEngine()
  const docs = engine?.getAllDocuments()
  const getNode = useGetNode()
  console.log("===>ComponentTree", module, docs)

  const getReactionableSchemas = useCallback((node: ITreeNode<unknown, IControllerMeta>) => {
    const nodes: ReactionableNode[] = []
    let activeNodes = nodes
    if (node.meta["x-controller"]?.id) {
      const rNode: ReactionableNode = {
        node: node,
        children: []
      }
      nodes.push(rNode)
      activeNodes = rNode.children || []
    }

    for (const childId of node.children) {
      const child = getNode(childId)
      if (child) {
        const children = getReactionableSchemas(child as ITreeNode<unknown, IControllerMeta>)
        activeNodes.push(...children)
      }
    }
    return nodes
  }, [getNode])

  const getSchemaTreeOfView = useCallback((id: string) => {
    const doc = docs?.find(doc => doc.id === id)
    const rootNode = doc?.getRootNode()
    if (rootNode) {
      return getReactionableSchemas(rootNode as ITreeNode<unknown, IControllerMeta>)
    }

  }, [docs, getReactionableSchemas])

  const getOneNode = useCallback((rNode: ReactionableNode): DataNode => {
    return {
      key: rNode.node.id,
      title: rNode.node.meta?.["x-controller"]?.name || rNode.node.title,
      children: rNode.children?.map(child => getOneNode(child))
    }
  }, [])

  const treeData: DataNode[] = useMemo(() => {
    return module?.views?.map(view => ({
      key: view.id,
      title: view.title,
      children: getSchemaTreeOfView(view.id)?.map(schema => getOneNode(schema)),
    })) || []
  }, [getOneNode, getSchemaTreeOfView, module?.views])

  return (
    <TreeContainer>
      <DirectoryTree
        selectable={false}
        treeData={treeData}
      />
    </TreeContainer>
  )
})