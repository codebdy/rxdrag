/* eslint-disable @typescript-eslint/no-explicit-any */
import { forwardRef, memo, useCallback, useMemo } from "react"
import { Tree } from 'antd';
import type { DataNode } from "antd/es/tree";
import classNames from "classnames";
import { ITreeDataNode, TreeListContent, TreeListProps, TreeListShell } from "@rxdrag/react-antd-components";

const { DirectoryTree } = Tree;


export const TreeListDesigner = memo(forwardRef<HTMLDivElement, TreeListProps>((props, ref) => {
  const {
    onSelect,
    loading,
    dataSource,
    defaultExpandAll = false,
    style,
    className,
    children,
    ...rest
  } = props;

  // const handleExpand: DirectoryTreeProps['onExpand'] = useCallback((keys: any) => {
  //   setExpands(keys)
  // }, []);


  const getOneNode = useCallback((node: ITreeDataNode): DataNode => {
    return {
      key: node.id,
      title: children,
      isLeaf: !node.children?.length,
      selectable: !node.children?.length,
      children: node.children?.map(node => getOneNode(node))
    }
  }, [children])

  const treeData: DataNode[] = useMemo(
    () => dataSource?.map(node => getOneNode(node)) || [],
    [dataSource, getOneNode]
  );

  return (
    <TreeListShell
      ref={ref}
      style={style}
      className={classNames("tree-editor-shell", className)}
    >
      <TreeListContent>
        <DirectoryTree
          //showIcon={false}
          multiple={false}
          defaultExpandAll={defaultExpandAll}
          //selectedKeys={selected ? [selected] : []}
          //onSelect={handleSelect}
          //onExpand={handleExpand}
          treeData={treeData}
          {...rest}
        />
      </TreeListContent>
    </TreeListShell>
  )
}))
