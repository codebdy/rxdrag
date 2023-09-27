import { Tree } from "antd";
import { DataNode, DirectoryTreeProps } from "antd/es/tree";
import { memo, useCallback, useMemo } from "react"
import { TreeContainer } from "../../common/TreeContainer";
import { RootVarsLabel } from "./RootVarsLabel";
import { useModule } from "../../../hooks/useModule";
import { setPropIcon, listenPropIcon, variableIcon } from "../../icons";
import { RootFlowsLabel } from "./RootFlowsLabel";
import { NodeIndexOutlined } from "@ant-design/icons";
import { VariableLabel } from "./VariableLabel";
import { FlowLabel } from "./FlowLabel";
import { ID } from "@rxdrag/shared";

const { DirectoryTree } = Tree;

export const Flows = memo((
  props: {
    onSelect: (id: ID) => void,
  }
) => {
  const { onSelect } = props;
  const module = useModule()
  const treeData: DataNode[] = useMemo(() => [
    {
      title: <RootFlowsLabel />,
      key: 'flows',
      selectable: false,
      children: module?.flows?.map(flow => {
        return {
          key: flow.id,
          title: <FlowLabel flow={flow} />,
          icon: <NodeIndexOutlined />,
        }
      })
    },
    {
      title: <RootVarsLabel />,
      key: 'vars',
      selectable: false,
      children: module?.variables?.map(variable => {
        return {
          key: variable.id,
          title: <VariableLabel variable={variable} />,
          selectable: false,
          icon: variableIcon,
          children: [
            {
              key: variable.name + "set",
              title: "设置",
              isLeaf: true,
              icon: setPropIcon,
              selectable: false,
            },
            {
              key: variable.name + "listen",
              title: "监听",
              isLeaf: true,
              icon: listenPropIcon,
              selectable: false,
            },
          ]
        }
      })
    }
  ], [module?.flows, module?.variables]);


  const handleSelect: DirectoryTreeProps['onSelect'] = useCallback((keys: React.Key[]) => {
    onSelect?.((keys?.[0] as ID | undefined) || "")
  }, [onSelect]);

  return (
    <>
      <TreeContainer>
        <DirectoryTree
          onSelect={handleSelect}
          treeData={treeData}
        />
      </TreeContainer>
    </>
  )
})