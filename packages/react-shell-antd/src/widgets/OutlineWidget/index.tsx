import { DownOutlined } from "@ant-design/icons";
import { useActiveIdState, useGetNode, useActions, useCurrentTree, useNodeChanged, useSelectedNodeIds } from "@rxdrag/react-core";
import { ID } from "@rxdrag/shared";
import { Tree, TreeProps } from "antd";
import { DataNode } from "antd/es/tree";
import { Key, memo, useCallback, useMemo } from "react"
import { PaneContainer } from "../../layouts/ToggleAblePane/PaneContainer";
import { PanelContent } from "../../layouts/ToggleAblePane/PanelContent";
import { PaneTitle } from "../../layouts/ToggleAblePane/PaneTitle";

export const OutlineWidget = memo((
  props: {
    display: boolean,
  }
) => {
  const { display } = props
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
      actions?.selectNodes(selectedKeys as any, currentTree?.documentId)
    }
  }, [actions, currentTree]);

  const handleMouseEnter = useCallback((info: any) => {
    setActivedId(info?.node?.key)
  }, [setActivedId])

  const handleMouseLeave = useCallback(() => {
    setActivedId(null)
  }, [setActivedId])

  return (
    <PaneContainer style={{ display: display ? undefined : "none" }}>
      <PaneTitle title="outline" />
      <PanelContent style={{ paddingTop: 8 }}>
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
      </PanelContent>
    </PaneContainer>
  )
})