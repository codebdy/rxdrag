import { Tree } from "antd";
import { DataNode, DirectoryTreeProps } from "antd/es/tree";
import { memo } from "react"
import { TreeContainer } from "../common/TreeContainer";
import { CodeOutlined } from "@ant-design/icons";

const { DirectoryTree } = Tree;

const treeData: DataNode[] = [
  {
    title: '根目录',
    key: '0-0',
    children: [
      {
        title: '列表',
        key: '0-1',
        children: [
          { title: 'leaf 1-0', key: '0-1-0', isLeaf: true, icon: <CodeOutlined /> },
          { title: 'leaf 1-1', key: '0-1-1', isLeaf: true, icon: <CodeOutlined /> },
        ],
      },
      { title: '添加用户', key: '0-0-0', isLeaf: true, icon: <CodeOutlined /> },
      { title: '编辑用户', key: '0-0-1', isLeaf: true, icon: <CodeOutlined /> },
      { title: '删除用户', key: '0-0-2', isLeaf: true, icon: <CodeOutlined /> },
    ],
  },

];


export const Scripts = memo(() => {
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