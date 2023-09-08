import type { Key } from "react";
import { memo, useCallback, useMemo, useState } from "react"
import { Spin, Tree } from 'antd';
import type { DataNode, DirectoryTreeProps } from "antd/es/tree";
import { ItemLabel } from "./ItemLabel";
import { EditButton } from "./EditButton";
import { FolderOpenOutlined, FolderOutlined } from "@ant-design/icons";
import styled from "styled-components";

const { DirectoryTree } = Tree;

const TreeEditorShell = styled.div`
  display: flex;
  flex-flow: column;
  height: 100%;
`

const TreeTitle = styled.div`
  display: flex;
  align-items: center;
  height: 48px;
  justify-content: space-between;
  border-bottom: solid 1px ${props => props.theme.token?.colorBorderSecondary};
  padding: 0 16px;
  .anticon{
    color:${props => props.theme.token?.colorPrimary};
  }
`

const TreeContent = styled.div`
  flex:1;
  padding: 16px 8px;
  overflow: auto;
  height: 0;
`

const SpinContainer = styled(TreeContent)`
  display: flex;
  align-items: center;
  justify-content: center;
`

const StyledTree = styled(DirectoryTree)`
  .ant-tree-treenode{
    padding: 0;
    border-radius: 5px;
    width: 100%;
    display: flex;
    align-items: center;
    margin: 2px 0;
    padding: 0 0 0 8px;
    .anticon-file{
      display: none;
    }
    .ant-tree-switcher{
      display: flex;
      align-items: center;
      width: 12px;
    }
    .ant-tree-node-content-wrapper{
      flex:1;
      display: flex;
      align-items: center;
      background-color: transparent;
      .ant-tree-title{
        flex:1;
        background-color: transparent;
      }
    }
    &:hover{
      background-color: #d8d1bf;
      color: #a21f2d;
    }
    &::before{
      display: none;
    }
  }
  .ant-tree-node-selected{
    color: #a21f2d !important;
  }
  .ant-tree-treenode-selected{
    background-color: #d8d1bf;
    color: #a21f2d;
    .ant-tree-switcher{
      color: #a21f2d !important;
    }
    &:hover{
      background-color: #d8d1bf;
    }
    &::before{
      display: none;
    }
  }
`
export type FieldNames = {
  name?: string,
  key?: string,
  value?: string,
  children?: string,
  sort?: string,
  count?: string
}
export const defaultFieldNames = {
  name: 'name',
  key: 'id',
  value: 'id',
  children: 'children',
  sort: "sort",
  count: "count"
}

export type ModuleTreeEditorProps = {
  title: string;
  onSelect?: (id?: string) => void;
  readOnly?: boolean | undefined;
}

export const ModuleTreeEditor = memo((
  props: ModuleTreeEditorProps
) => {
  const { title, onSelect, readOnly } = props;
  const [selected, setSelected] = useState<string>();
  const [expands, setExpands] = useState<string[]>();
  const { loading, data } = useQuery<unknown[] | undefined>({
    api: entityConfig.curdApi.listAll,
    entity: entityConfig.entity
  })

  const tree = useMemo(() => {
    return TreeKit.toTree(data, treeFieldNames)
  }, [data, treeFieldNames])

  const getNodeById = useCallback((nodes: any[], id: string): any | undefined => {
    for (const node of nodes) {
      const key = node[treeFieldNames.key || defaultFieldNames.key]
      if (key === id) {
        return node
      }
      const children = node[treeFieldNames.children || defaultFieldNames.children]
      if (children && children.length) {
        const child = getNodeById(children, id)
        if (child) {
          return child
        }
      }
    }
  }, [])

  const handleSelect = useCallback((selectedKeys: Key[]) => {
    const key = selectedKeys?.[0] as string | undefined
    if (key) {
      const node = getNodeById(tree, key)
      if (node) {
        const children = node[treeFieldNames.children || defaultFieldNames.children]
        if (!children?.length) {
          setSelected(key)
          onSelect?.(node)
        }
      }
    }
  }, [getNodeById, onSelect, tree]);

  const handleExpand: DirectoryTreeProps['onExpand'] = useCallback((keys: any) => {
    setExpands(keys)
  }, []);

  const getNodes = useCallback((nodesData: unknown[] | undefined, parent?: unknown) => {
    const nodes: DataNode[] = []
    for (const child of nodesData || []) {
      const node = child as any;
      const id = node[treeFieldNames.key || defaultFieldNames.key]
      const children = getNodes(node[treeFieldNames.children || defaultFieldNames.children], node)
      const folderIcon = expands?.find(k => k === id) ? <FolderOpenOutlined /> : <FolderOutlined />
      nodes.push({
        key: id,
        title: <ItemLabel
          treeFieldNames={treeFieldNames}
          entityConfig={entityConfig}
          parent={parent}
          node={node}
          icon={children?.length ? folderIcon : undefined}
          readOnly={readOnly}
        />,
        children: children,
        isLeaf: children?.length ? false : true,
      })
    }

    return nodes.length > 0 ? nodes : undefined
  }, [expands, readOnly])

  const treeData = useMemo(() => {
    return getNodes(tree)
  }, [getNodes, tree])

  return (
    <TreeEditorShell className="tree-editor-shell">
      <TreeTitle className="tree-title">
        <span>{title}</span>
        {
          !readOnly && <EditButton treeFieldNames={treeFieldNames} entityConfig={entityConfig} />
        }
      </TreeTitle>
      {
        loading
          ?
          <SpinContainer>
            <Spin spinning={loading} />
          </SpinContainer>
          : <TreeContent>
            <StyledTree
              showIcon={false}
              multiple={false}
              defaultExpandAll={false}
              selectedKeys={selected ? [selected] : []}
              onSelect={handleSelect}
              onExpand={handleExpand}
              treeData={treeData || []}
            />
          </TreeContent>
      }
    </TreeEditorShell>
  )
}) 
