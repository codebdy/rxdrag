/* eslint-disable @typescript-eslint/no-explicit-any */
import { DownOutlined } from "@ant-design/icons";
import { useActiveIdState, useGetNode, useActions, useCurrentTree, useNodeChanged, useSelectedNodeIds } from "@rxdrag/react-core";
import { ID } from "@rxdrag/shared";
import { Tree, TreeProps } from "antd";
import { DataNode } from "antd/es/tree";
import { Key, memo, useCallback, useMemo } from "react"

export const OutlineTree = memo(() => {
  const [activedId, setActivedId] = useActiveIdState()
  const getNode = useGetNode()
  const actions = useActions()
  const currentTree = useCurrentTree()
  const nodeChangeFlag = useNodeChanged()
  const selectedNodeIds = useSelectedNodeIds(currentTree?.documentId)
  const transNode = useCallback((id: ID): DataNode | undefined => {
    const node = getNode(id)
    const children: DataNode[] = node?.children?.map(childId => transNode(childId)).filter(nd => nd !== undefined) as any || []
    for (const key of Object.keys(node?.slots || {})) {
      const slotId = node?.slots?.[key]
      if (slotId) {
        const slot = transNode(slotId)
        if (slot) {
          children.push(slot)
        }
      }
    }
    if (node) {
      return {
        title: node.title,
        key: node.id,
        children: children
      }
    }

    return undefined
  }, [getNode])

  const treeItems: DataNode[] = useMemo(() => {
    if (!currentTree) {
      return []
    }
    const root = transNode(currentTree.id)
    if (!root) {
      return []
    }
    return [
      root
    ]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTree, nodeChangeFlag, transNode])

  const onSelect: TreeProps['onSelect'] = useCallback((selectedKeys: Key[]) => {
    if (currentTree) {
      actions?.selectNodes(selectedKeys as any)
    }
  }, [actions, currentTree]);

  const handleMouseEnter = useCallback((info: any) => {
    setActivedId(info?.node?.key)
  }, [setActivedId])

  const handleMouseLeave = useCallback(() => {
    setActivedId(null)
  }, [setActivedId])

  return (
    <Tree
      showLine
      switcherIcon={<DownOutlined />}
      defaultExpandedKeys={[currentTree?.id || ""]}
      activeKey={activedId || ""}
      selectedKeys={selectedNodeIds || undefined}
      onSelect={onSelect}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      treeData={treeItems}
    />
  )
})