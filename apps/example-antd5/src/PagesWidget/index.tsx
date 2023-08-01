import Tree, { DataNode, DirectoryTreeProps } from "antd/es/tree";
import { Key, memo, useCallback } from "react"
import { PaneContainer, PanelContent, PaneTitle } from "@rxdrag/react-antd-shell"

const { DirectoryTree } = Tree;

const treeData: DataNode[] = [
  {
    title: '展示页',
    key: 'displays',
    children: [
      { title: '工作台', key: 'dashboard', isLeaf: true },
      { title: '详情页', key: 'details', isLeaf: true },
      { title: '列表页', key: 'list', isLeaf: true },
      { title: '列表页(快捷)', key: 'listShortcut', isLeaf: true },
      { title: '脚本控制器', key: 'script', isLeaf: true },
      { title: '自定义循环', key: 'customizedLoop', isLeaf: true },
      { title: '测试页', key: 'test', isLeaf: true },
      { title: '打地鼠', key: 'mole', isLeaf: true },
    ],
  },
  {
    title: '表单页',
    key: 'forms',
    children: [
      { title: '基础表单', key: 'basic-form', isLeaf: true },
      { title: '表单验证', key: 'form-validation', isLeaf: true },
      { title: '分步表单', key: 'step-form', isLeaf: true },
      { title: '高级表单', key: 'advance-form', isLeaf: true },
    ],
  },
];


export const PagesWidget = memo((
  props: {
    display: boolean,
    value: string,
    onSelect: (value: string) => void
  }
) => {
  const { value, onSelect, display } = props

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSelect: DirectoryTreeProps['onSelect'] = useCallback((keys: Key[],root:any) => {
    if(root.node.children) return 
    onSelect(keys?.[0].toString() || "")
  }, [onSelect]);

  return (
    <PaneContainer style={{ display: display ? undefined : "none" }}>
      <PaneTitle title="pages" />
      <PanelContent style={{ paddingTop: 8 }}>
        <DirectoryTree
          selectedKeys={[value]}
          multiple={false}
          defaultExpandAll
          onSelect={handleSelect}
          treeData={treeData}
        />
      </PanelContent>
    </PaneContainer>
  )
})