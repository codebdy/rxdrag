/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Key } from "react";
import { forwardRef, memo, useCallback, useMemo, useState } from "react"
import styled from "styled-components"
import { Spin, Tree } from 'antd';
import type { DataNode, DirectoryTreeProps } from "antd/es/tree";
import { EditButton } from "./EditButton";
import classNames from "classnames";
const { DirectoryTree } = Tree;

const TreeEditorShell = styled.div`
  display: flex;
  flex-flow: column;
  height: 100%;
  .bordered{
    border: solid 1px ${props => props.theme?.token?.colorBorder}
  }
`

const TreeTitle = styled.div`
  display: flex;
  align-items: center;
  height: 48px;
  justify-content: space-between;
  border-bottom: solid 1px ${props => props.theme.token?.colorBorderSecondary};
  padding: 0 16px;
  .anticon{
    //color:${props => props.theme.token?.colorPrimary};
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

export enum PopupType {
  popover = "popover",
  modal = "modal",
  drawer = "drawer"
}

export type TreeListProps = {
  title: React.ReactNode;
  onSelect?: (node?: any) => void;
  readOnly?: boolean | undefined;
  loading?: boolean;
  dataSource?: DataNode[];
  popupType?: PopupType,
  idKey?: string,
  labelKey?: string,
  onSave?: (node?: any) => void;
  onRemove?: (node?: any) => void;
  bordered?: boolean;
  popup?: React.ReactNode;
}

export const TreeList = memo(forwardRef<HTMLDivElement, TreeListProps>((props, ref) => {
  const { title,
    onSelect,
    readOnly,
    loading,
    dataSource,
    popupType = PopupType.popover,
    idKey = "id",
    labelKey = "title",
    bordered
  } = props;
  const [selected, setSelected] = useState<string>();
  const [expands, setExpands] = useState<string[]>();
  // const { loading, data } = useQuery<unknown[] | undefined>({
  //   api: entityConfig.curdApi.listAll,
  //   entity: entityConfig.entity
  // })

  // const tree = useMemo(() => {
  //   return TreeKit.toTree(data, treeFieldNames)
  // }, [data, treeFieldNames])

  const handleSelect = useCallback((selectedKeys: Key[]) => {
    const key = selectedKeys?.[0] as string | undefined
    if (key) {
      // const node = getNodeById(tree, key)
      // if (node) {
      //   const children = node[treeFieldNames.children || defaultFieldNames.children]
      //   if (!children?.length) {
      //     setSelected(key)
      //     onSelect?.(node)
      //   }
      // }
    }
  }, []);

  const handleExpand: DirectoryTreeProps['onExpand'] = useCallback((keys: any) => {
    setExpands(keys)
  }, []);

  // const getNodes = useCallback((nodesData: unknown[] | undefined, parent?: unknown) => {
  //   const nodes: DataNode[] = []
  //   for (const child of nodesData || []) {
  //     const node = child as any;
  //     const id = node[treeFieldNames.key || defaultFieldNames.key]
  //     const children = getNodes(node[treeFieldNames.children || defaultFieldNames.children], node)
  //     const folderIcon = expands?.find(k => k === id) ? <FolderOpenOutlined /> : <FolderOutlined />
  //     nodes.push({
  //       key: id,
  //       title: <ItemLabel
  //         treeFieldNames={treeFieldNames}
  //         entityConfig={entityConfig}
  //         parent={parent}
  //         node={node}
  //         icon={children?.length ? folderIcon : undefined}
  //         readOnly={readOnly}
  //       />,
  //       children: children,
  //       isLeaf: children?.length ? false : true,
  //     })
  //   }

  //   return nodes.length > 0 ? nodes : undefined
  // }, [expands, readOnly])

  const treeData: DataNode[] = useMemo(() => {
    return []
  }, [])

  return (
    <TreeEditorShell ref={ref} className={classNames("tree-editor-shell", { bordered })}>
      <TreeTitle className="tree-title">
        <span>{title}</span>
        {
          !readOnly && <EditButton
            idKey={idKey}
            labelKey={labelKey}
          />
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
}))
