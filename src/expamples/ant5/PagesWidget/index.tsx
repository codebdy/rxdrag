import Tree, { DataNode, DirectoryTreeProps } from "antd/es/tree";
import { memo } from "react"
import { PaneContainer } from "react-shells/ant5/layouts/ToggleAblePane/PaneContainer"
import { PanelContent } from "react-shells/ant5/layouts/ToggleAblePane/PanelContent"
import { PaneTitle } from "react-shells/ant5/layouts/ToggleAblePane/PaneTitle"

const { DirectoryTree } = Tree;

const treeData: DataNode[] = [
  {
    title: '展示页',
    key: 'displays',
    children: [
      { title: '工作台', key: 'dashboard', isLeaf: true },
      { title: '详情页', key: 'details', isLeaf: true },
      { title: '列表页', key: 'list', isLeaf: true },
    ],
  },
  {
    title: '表单页',
    key: 'forms',
    children: [
      { title: '基础表单', key: 'basic-form', isLeaf: true },
      { title: '分步表单', key: 'step-form', isLeaf: true },
      { title: '高级表单', key: 'advance-form', isLeaf: true },
    ],
  },
];


export const PagesWidget = memo((
  props: {
    display: boolean,
  }
) => {
  const { display } = props

  const onSelect: DirectoryTreeProps['onSelect'] = (keys, info) => {
    console.log('Trigger Select', keys, info);
  };

  const onExpand: DirectoryTreeProps['onExpand'] = (keys, info) => {
    console.log('Trigger Expand', keys, info);
  };
  
  return (
    <PaneContainer style={{ display: display ? undefined : "none" }}>
      <PaneTitle title="pages" />
      <PanelContent style={{ paddingTop: 8 }}>
        <DirectoryTree
          multiple
          defaultExpandAll
          onSelect={onSelect}
          onExpand={onExpand}
          treeData={treeData}
        />
      </PanelContent>
    </PaneContainer>
  )
})