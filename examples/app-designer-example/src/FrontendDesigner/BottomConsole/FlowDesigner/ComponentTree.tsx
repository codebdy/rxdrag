import { Tree } from "antd";
import { DataNode, DirectoryTreeProps } from "antd/es/tree";
import { memo } from "react"
import { TreeContainer } from "../common/TreeContainer";

const { DirectoryTree } = Tree;

const treeData: DataNode[] = [
  {
    title: '字段1',
    key: '0-0',
    children: [
      {
        title: '列表',
        key: '0-1',
        children: [
          { title: 'leaf 1-0', key: '0-1-0', isLeaf: true },
          { title: 'leaf 1-1', key: '0-1-1', isLeaf: true },
        ],
      },
    ],
  },
  {
    title: '字段2',
    key: 'vars',
  }

];


export const ComponentTree = memo(() => {
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