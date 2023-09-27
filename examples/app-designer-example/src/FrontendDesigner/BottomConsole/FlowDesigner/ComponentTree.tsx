import { Tree } from "antd";
import { DataNode } from "antd/es/tree";
import { memo, useCallback, useMemo } from "react"
import { TreeContainer } from "../common/TreeContainer";
import { useModule } from "../../hooks/useModule";
import { useDesignerEngine, useGetNode } from "@rxdrag/react-core";
import { ITreeNode } from "@rxdrag/core"
import { IControllerMeta } from "@rxdrag/minions-runtime-react";
import { ThunderboltOutlined } from "@ant-design/icons";
import { puzzleIcon, setPropIcon, listenPropIcon } from "../icons";

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
    const children = rNode.children?.map(child => getOneNode(child))
    return {
      key: rNode.node.id,
      icon: puzzleIcon,
      title: rNode.node.meta?.["x-controller"]?.name || rNode.node.title,
      children: [
        ...children || [],
        {
          key: rNode.node.id + "setprops",
          title: "设置属性",
          isLeaf: true,
          icon: setPropIcon,
        },
        {
          key: rNode.node.id + "listenprops",
          title: "监听属性",
          isLeaf: true,
          icon: listenPropIcon
        },
        {
          key: rNode.node.id + "init",
          title: "初始化",
          icon: <ThunderboltOutlined />,
          isLeaf: true,
        },
        {
          key: rNode.node.id + "onClick",
          title: "点击",
          icon: <ThunderboltOutlined />,
          isLeaf: true,
        },
      ]
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