/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Key } from "react";
import { forwardRef, memo, useCallback, useMemo, useState } from "react"
import styled from "styled-components"
import { Spin } from 'antd';
import type { DataNode, DirectoryTreeProps } from "antd/es/tree";
import { EditButton } from "./EditButton";
import classNames from "classnames";
import { TreeListShell } from "./TreeListShell";
import { TreeListTitle } from "./TreeListTitle";
import { TreeListContent } from "./TreeListContent";
import { TreeListTreeView } from "./TreeListTreeView";

const SpinContainer = styled(TreeListContent)`
  display: flex;
  align-items: center;
  justify-content: center;
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
  popupProps?: any,
  idKey?: string,
  labelKey?: string,
  onSave?: (node?: any) => void;
  onRemove?: (node?: any) => void;
  bordered?: boolean;
  formLayout?: React.ReactNode;
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
    bordered,
    formLayout
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
    <TreeListShell ref={ref} className={classNames("tree-editor-shell", { bordered })}>
      <TreeListTitle className="tree-title">
        <span>{title}</span>
        {
          !readOnly && <EditButton
            idKey={idKey}
            labelKey={labelKey}
          />
        }
      </TreeListTitle>
      {
        loading
          ?
          <SpinContainer>
            <Spin spinning={loading} />
          </SpinContainer>
          : <TreeListContent>
            <TreeListTreeView
              showIcon={false}
              multiple={false}
              defaultExpandAll={false}
              selectedKeys={selected ? [selected] : []}
              onSelect={handleSelect}
              onExpand={handleExpand}
              treeData={treeData || []}
            />
          </TreeListContent>
      }
    </TreeListShell>
  )
}))
