import { Tree } from 'antd';
import React, { memo, useCallback } from 'react';
import "./index.less"
import CreateCategoryDialog from './CreateCategoryDialog';
import CreateProcessDialog from './CreateProcessDialog';
import { useRecoilState } from 'recoil';
import CategoryLabel from './CategoryLabel';
import ProcessLabel from './ProcessLabel';
import { useCategories } from '../hooks/useCategories';
import { useGetProcess } from '../hooks/useGetProcess';
import { selectedBpmnProcessIdState } from '../recoil/atoms';
import { useProcessesWithoutCategory } from '../hooks/useProcessesWithoutCategory';
import { useGetCategoryProcesses } from '../hooks/useGetCategoryProcesses';
import { useDesignerParams } from 'plugin-sdk';
import { DataNode } from 'antd/es/tree';

const { DirectoryTree } = Tree;

const ProcessList = memo((
  props: {
  }
) => {
  const categories = useCategories();
  const { app } = useDesignerParams()

  const getProcess = useGetProcess();

  // const getPageCategory = useGetPageCategory();
  const [selectedProcessId, setSelectedProcessId] = useRecoilState(selectedBpmnProcessIdState(app?.id));
  const pagesWithoutCategory = useProcessesWithoutCategory();
  const getCategoryProcesses = useGetCategoryProcesses();

  const getTreeData = useCallback(() => {
    const dataNodes: DataNode[] = []
    for (const category of categories) {
      dataNodes.push({
        title: <CategoryLabel categories={categories} category={category} />,
        key: category.id,
        children: getCategoryProcesses(category.uuid)?.map((page) => {
          return {
            title: page && <ProcessLabel process={page} categories={categories} />,
            key: page.id,
            isLeaf: true,
          }
        })
      })
    }

    for (const page of pagesWithoutCategory) {
      dataNodes.push({
        title: page && <ProcessLabel process={page} categories={categories} />,
        key: page.id,
        isLeaf: true,
      })
    }
    return dataNodes
  }, [categories, getCategoryProcesses, pagesWithoutCategory])

  const onSelect = (selectedKeys: any) => {
    const page = getProcess(selectedKeys?.[0]);
    if (page?.id) {
      setSelectedProcessId(page?.id);
    }
  };

  return (
    <div className='process-list-shell'>
      <div className="process-list-action">
        <CreateCategoryDialog />
        <CreateProcessDialog categories={categories} />
      </div>
      <DirectoryTree
        className='process-list-tree'
        selectedKeys={[selectedProcessId] as any}
        onSelect={onSelect}
        treeData={getTreeData()}
      />
    </div>
  );
});

export default ProcessList;