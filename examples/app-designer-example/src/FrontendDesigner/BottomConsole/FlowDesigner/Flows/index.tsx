import { Button, Tree } from "antd";
import { DataNode, DirectoryTreeProps } from "antd/es/tree";
import { memo, useMemo } from "react"
import { TreeContainer } from "../../common/TreeContainer";
import TreeNodeLabel from "../../common/TreeNodeLabel";
import { PlusOutlined } from "@ant-design/icons";
import { RootVarsLabel } from "./RootVarsLabel";
import { useModule } from "../../../hooks/useModule";
import { setPropIcon, listenPropIcon, variableIcon } from "../../icons";

const { DirectoryTree } = Tree;

export const Flows = memo(() => {
  const module = useModule()
  const treeData: DataNode[] = useMemo(() => [
    {
      title: <TreeNodeLabel
        action={
          <Button
            size="small"
            type="text"
            icon={<PlusOutlined />}
          />
        }
      >
        行为流
      </TreeNodeLabel>,
      key: 'flows',
      selectable: false,
    },
    {
      title: <RootVarsLabel />,
      key: 'vars',
      selectable: false,
      children: module?.variables?.map(variable => {
        return {
          key: variable.id,
          title: variable.name,
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
  ], [module?.variables]);


  const onSelect: DirectoryTreeProps['onSelect'] = (keys, info) => {
    console.log('Trigger Select', keys, info);
  };

  const onExpand: DirectoryTreeProps['onExpand'] = (keys, info) => {
    console.log('Trigger Expand', keys, info);
  };
  return (
    <>
      <TreeContainer>
        <DirectoryTree
          onSelect={onSelect}
          onExpand={onExpand}
          treeData={treeData}
        />
      </TreeContainer>
    </>
  )
})