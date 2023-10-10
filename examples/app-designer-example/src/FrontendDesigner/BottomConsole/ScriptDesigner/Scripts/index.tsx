import { Tree } from "antd";
import { DataNode, DirectoryTreeProps } from "antd/es/tree";
import { memo, useCallback, useMemo } from "react"
import { TreeContainer } from "../../common/TreeContainer";
import { useModule } from "../../../hooks/useModule";
import { RootLabel } from "./RootLabel";
import { CodeOutlined, NodeIndexOutlined } from "@ant-design/icons";
import { ScriptLabel } from "./ScriptLabel";
import { ID } from "@rxdrag/shared";
import { useQueryModuleScripts } from "../../../../hooks/useQueryModuleScripts";
import { ListNode } from "../../FlowDesigner/Flows/ListNode";
import { useGetListNodes } from "../../FlowDesigner/Flows/useGetListNodes";
import { SvgIcon } from "@rxdrag/react-antd-shell";
import { ListNodeLabel } from "./ListNodeLabel";
import { useDesignerEngine } from "@rxdrag/react-core";
import { puzzleIcon } from "@rxdrag/react-shared";

const { DirectoryTree } = Tree;

export const Scripts = memo((
  props: {
    selected?: ID | null,
    display?: boolean,
    onSelect: (id: ID) => void,
  }
) => {
  const { selected, display, onSelect } = props;
  const module = useModule()
  const engine = useDesignerEngine()
  const { scripts } = useQueryModuleScripts(module?.id)
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
        ...scripts?.filter(script => script.ownerId === ctrlMeta?.id && ctrlMeta.id).map(script => {
          return {
            key: script.id,
            title: <ScriptLabel script={script} />,
            icon: <NodeIndexOutlined />,
          }
        }) || []
      ]
    }
  }, [engine, scripts])
  
  const treeData: DataNode[] = useMemo(() => [
    {
      title: <RootLabel />,
      key: 'scripts',
      selectable: false,
      children: [
        ...module?.views?.map(view => ({
          key: view.id,
          title: view.title,
          selectable: false,
          children: getListNodes(view.id)?.map(schema => getOneNode(schema)),
        })).filter(node => node.children?.length) || [],
        ...scripts?.filter(script => script.ownerId === module?.id)?.map(script => {
          return {
            key: script.id,
            title: <ScriptLabel script={script} />,
            icon: <CodeOutlined />,
            isLeaf: true,
          }
        }) || []
      ]
    },
  ], [getListNodes, getOneNode, module?.id, module?.views, scripts]);


  const handleSelect: DirectoryTreeProps['onSelect'] = useCallback((keys: React.Key[]) => {
    onSelect?.((keys?.[0] as ID | undefined) || "")
  }, [onSelect]);

  return (
    <>
      <TreeContainer
        className={!display ? "hidden" : undefined}
      >
        <DirectoryTree
          selectedKeys={[selected || ""]}
          onSelect={handleSelect}
          treeData={treeData}
        />
      </TreeContainer>
    </>
  )
})