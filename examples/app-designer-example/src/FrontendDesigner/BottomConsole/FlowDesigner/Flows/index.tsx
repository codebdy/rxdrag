import { Tree } from "antd";
import { DataNode, DirectoryTreeProps } from "antd/es/tree";
import { memo, useCallback, useMemo } from "react"
import { TreeContainer } from "../../common/TreeContainer";
import { useModule } from "../../../hooks/useModule";
import { RootFlowsLabel } from "./RootFlowsLabel";
import { NodeIndexOutlined } from "@ant-design/icons";
import { FlowLabel } from "./FlowLabel";
import { ID } from "@rxdrag/shared";
import { useGetListNodes } from "./useGetListNodes";
import { ListNode } from "./ListNode";
import { useQueryModuleFlows } from "../../../../hooks/useQueryModuleFlows";
import { puzzleIcon } from "../../icons";
import { SvgIcon } from "@rxdrag/react-antd-shell";
import { useDesignerEngine } from "@rxdrag/react-core";
import { ListNodeLabel } from "./ListNodeLabel";

const { DirectoryTree } = Tree;

export const Flows = memo((
  props: {
    selected?: ID,
    onSelect: (id: ID) => void,
    display?: boolean,
  }
) => {
  const { selected, onSelect, display } = props;
  const module = useModule()
  const engine = useDesignerEngine()

  const { flows } = useQueryModuleFlows(module?.id)
  const getListNodes = useGetListNodes()

  const getOneNode = useCallback((listNode: ListNode): DataNode => {
    const children = listNode.children?.map(child => getOneNode(child))
    const ctrlMeta = listNode.node.meta?.["x-controller"]
    return {
      key: listNode.node.id,
      icon: <SvgIcon>
        {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          engine?.getComponentManager().getComponentConfig(listNode.node.meta.componentName)?.resource?.icon as any || puzzleIcon
        }
      </SvgIcon>,
      selectable: false,
      title: <ListNodeLabel listNode={listNode} />,
      children: [
        ...children || [],
        ...flows?.filter(flow => flow.ownerId === ctrlMeta?.id && ctrlMeta.id).map(flow => {
          return {
            key: flow.id,
            title: <FlowLabel flow={flow} />,
            icon: <NodeIndexOutlined />,
          }
        }) || []
      ]
    }
  }, [engine, flows])


  const treeData: DataNode[] = useMemo(() => [
    {
      title: <RootFlowsLabel />,
      key: 'flows',
      selectable: false,
      children: [
        ...module?.views?.map(view => ({
          key: view.id,
          title: view.title,
          selectable: false,
          children: getListNodes(view.id)?.map(schema => getOneNode(schema)),
        })).filter(node => node.children?.length) || [],
        ...flows?.filter(flow => flow.ownerId === module?.id).map(flow => {
          return {
            key: flow.id,
            title: <FlowLabel flow={flow} />,
            icon: <NodeIndexOutlined />,
          }
        }) || []
      ]
    },
  ], [flows, getListNodes, getOneNode, module?.id, module?.views]);


  const handleSelect: DirectoryTreeProps['onSelect'] = useCallback((keys: React.Key[]) => {
    onSelect?.((keys?.[0] as ID | undefined) || "")
  }, [onSelect]);

  return (
    <TreeContainer
      className={!display ? "hidden" : undefined}
    >
      <DirectoryTree
        selectedKeys={[selected || ""]}
        onSelect={handleSelect}
        treeData={treeData}
      />
    </TreeContainer>
  )
})