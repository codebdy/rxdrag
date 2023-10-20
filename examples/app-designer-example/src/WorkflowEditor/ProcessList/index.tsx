import { Tree } from 'antd';
import React, { memo, useCallback } from 'react';
import CreateCategoryDialog from './CreateCategoryDialog';
import CreateProcessDialog from './CreateProcessDialog';
import CategoryLabel from './CategoryLabel';
import ProcessLabel from './ProcessLabel';
import { DataNode } from 'antd/es/tree';
import { ID } from '@rxdrag/shared';
import styled from 'styled-components';
import { useQueryAppProcessCategories } from '../../hooks/useQueryAppProcessCategories';
import { useQueryAppProcesses } from '../../hooks/useQueryAppProcesses';
import { useProcessesWithoutCategory } from './hooks/useProcessesWithoutCategory';
import { useGetCategoryProcesses } from './hooks/useGetCategoryProcesses';

const { DirectoryTree } = Tree;

const ProcessListShell = styled.div`
  display: flex;
  flex:1;
  height: 100%;
  flex-flow: column;
  padding: 16px;
  border: solid 1px ${props => props.theme?.token?.colorBorderSecondary};
  background-color: ${props => props.theme?.token?.colorBgBase};
  border-left: 0;
  .process-list-action{
    padding: 0 0px;
    display: flex;
    justify-content: space-evenly;
    width: 100%;
  }

  .process-list-tree{
    flex: 1;
    overflow: auto;
    margin-top: 16px;
    background-color: transparent;
    .ant-tree-node-content-wrapper{
      display: flex;
      .ant-tree-title{
        flex:1;
      }
    }
  }

`

const ProcessList = memo((
  props: {
    selected?: ID,
    onSelectChange?: (selected?: ID) => void
  }
) => {
  const { selected, onSelectChange } = props;
  const { categories } = useQueryAppProcessCategories("app1");
  const { processes } = useQueryAppProcesses("app1")
  const processsWithoutCategory = useProcessesWithoutCategory(categories, processes);
  const getCategoryProcesses = useGetCategoryProcesses(processes);

  const getTreeData = useCallback(() => {
    const dataNodes: DataNode[] = []
    for (const category of categories || []) {
      dataNodes.push({
        title: <CategoryLabel categories={categories || []} category={category} />,
        key: category.id,
        selectable: false,
        children: getCategoryProcesses(category.id)?.map((process) => {
          return {
            title: process && <ProcessLabel process={process} categories={categories || []} />,
            key: process.id,
            isLeaf: true,
          }
        })
      })
    }

    for (const process of processsWithoutCategory) {
      dataNodes.push({
        title: process && <ProcessLabel process={process} categories={categories || []} />,
        key: process.id,
        isLeaf: true,
      })
    }
    return dataNodes
  }, [categories, getCategoryProcesses, processsWithoutCategory])

  const onSelect = (selectedKeys: React.Key[]) => {
    onSelectChange?.(selectedKeys?.[0] as string);
  };

  return (
    <ProcessListShell className='process-list-shell'>
      <div className="process-list-action">
        <CreateCategoryDialog />
        <CreateProcessDialog categories={categories || []} />
      </div>
      <DirectoryTree
        className='process-list-tree'
        selectedKeys={[selected || ""]}
        onSelect={onSelect}
        treeData={getTreeData()}
      />
    </ProcessListShell>
  );
});

export default ProcessList;