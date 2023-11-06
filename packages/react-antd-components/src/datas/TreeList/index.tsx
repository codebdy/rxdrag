/* eslint-disable @typescript-eslint/no-explicit-any */
import type { CSSProperties, Key } from "react";
import React, { forwardRef, memo, useCallback, useMemo, useState } from "react"
import styled from "styled-components"
import { ConfigProvider, Spin, Tree, theme } from 'antd';
import type { DataNode } from "antd/es/tree";
import classNames from "classnames";
import { TreeListShell } from "./TreeListShell";
import { ObjectField } from "@rxdrag/react-fieldy";
import { LogicflowRuntime, useArraySchema } from "@rxdrag/react-runner";

const { DirectoryTree } = Tree;

export const TreeListContent = styled.div`
  flex:1;
  padding: 16px 8px;
  overflow: auto;
  height: 0;
`;


const SpinContainer = styled(TreeListContent)`
  display: flex;
  align-items: center;
  justify-content: center;
`

export interface ITreeDataNode {
  id: string,
  children?: ITreeDataNode[],
}

export type TreeListProps = {
  onSelect?: (node?: any) => void;
  loading?: boolean;
  dataSource?: ITreeDataNode[];
  formLayout?: React.ReactNode;
  defaultExpandAll?: boolean;
  style?: CSSProperties;
  className?: string;
  children?: React.ReactNode;
}

export const TreeList = memo(forwardRef<HTMLDivElement, TreeListProps>((props, ref) => {
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
  const [selected, setSelected] = useState<string>();
  //const [expands, setExpands] = useState<string[]>();
  const { schema, childrenSchema } = useArraySchema()

  const getNodeById = useCallback((nodes?: ITreeDataNode[], id?: string): ITreeDataNode | undefined => {
    for (const node of nodes || []) {
      if (node.id === id) {
        return node
      }

      const child = getNodeById(node.children, id)

      if (child) {
        return child
      }
    }
  }, [])

  const handleSelect = useCallback((selectedKeys: Key[]) => {
    const key = selectedKeys?.[0] as string | undefined
    if (key) {
      const node = getNodeById(dataSource, key)
      if (node) {
        const children = node.children
        if (!children?.length) {
          setSelected(key)
          onSelect?.({ id: node.id })
        }
      }
    }
  }, [dataSource, getNodeById, onSelect]);

  // const handleExpand: DirectoryTreeProps['onExpand'] = useCallback((keys: any) => {
  //   setExpands(keys)
  // }, []);


  const getOneNode = useCallback((node: ITreeDataNode): DataNode => {
    return {
      key: node.id,
      title: <LogicflowRuntime
        ownerId={schema?.["x-controller"]?.id}
        schema={childrenSchema}
        scropeValue={node}
      >
        <ObjectField name={node.id} value={node}>
          <ConfigProvider
            theme={{
              algorithm: selected === node.id ? theme.darkAlgorithm : theme.defaultAlgorithm
            }}
          >
            {children}
          </ConfigProvider>
        </ObjectField>
      </LogicflowRuntime>,
      isLeaf: !node.children?.length,
      selectable: !node.children?.length,
      children: node.children?.map(node => getOneNode(node))
    }
  }, [children, childrenSchema, schema, selected])

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
      {
        loading
          ?
          <SpinContainer>
            <Spin spinning={loading} />
          </SpinContainer>
          : <TreeListContent>
            <DirectoryTree
              //showIcon={false}
              multiple={false}
              defaultExpandAll={defaultExpandAll}
              selectedKeys={selected ? [selected] : []}
              onSelect={handleSelect}
              //onExpand={handleExpand}
              treeData={treeData}
              {...rest}
            />
          </TreeListContent>
      }
    </TreeListShell>
  )
}))
