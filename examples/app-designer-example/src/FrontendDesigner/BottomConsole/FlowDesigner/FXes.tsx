import { Tree } from "antd";
import { DataNode, DirectoryTreeProps } from "antd/es/tree";
import { memo } from "react"
import { TreeContainer } from "./TreeContainer";
import { FunctionOutlined } from "@ant-design/icons";

const { DirectoryTree } = Tree;

const treeData: DataNode[] = [
  {
    title: '子编排',
    key: '0-0',
    children: [

      {
        title: '查询用户列表',
        key: '0-0-0', isLeaf: true,
        icon: <FunctionOutlined />
      },

    ],
  },
  {
    title: '全局',
    key: '0-1',
    children: [
      { title: 'leaf 1-0', key: '0-1-0', icon: <FunctionOutlined />, isLeaf: true },
      { title: 'leaf 1-1', key: '0-1-1', icon: <FunctionOutlined />, isLeaf: true },
    ],
  },
];

export const FXes = memo(() => {
  const onSelect: DirectoryTreeProps['onSelect'] = (keys, info) => {
    console.log('Trigger Select', keys, info);
  };

  const onExpand: DirectoryTreeProps['onExpand'] = (keys, info) => {
    console.log('Trigger Expand', keys, info);
  };
  return (
    <TreeContainer>
      <DirectoryTree
        onSelect={onSelect}
        onExpand={onExpand}
        treeData={treeData}
      />
    </TreeContainer>
  )
})