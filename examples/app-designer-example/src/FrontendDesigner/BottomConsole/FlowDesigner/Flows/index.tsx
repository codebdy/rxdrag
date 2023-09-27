import { Button, Tree } from "antd";
import { DataNode, DirectoryTreeProps } from "antd/es/tree";
import { memo, useMemo } from "react"
import { TreeContainer } from "../../common/TreeContainer";
import TreeNodeLabel from "../../common/TreeNodeLabel";
import { PlusOutlined } from "@ant-design/icons";
import { RootVarsLabel } from "./RootVarsLabel";

const { DirectoryTree } = Tree;

export const Flows = memo(() => {
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
        编排
      </TreeNodeLabel>,
      key: 'flows',
      selectable: false,
    },
    {
      title: <RootVarsLabel />,
      key: 'vars',
      selectable: false,
    }
  ], []);


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