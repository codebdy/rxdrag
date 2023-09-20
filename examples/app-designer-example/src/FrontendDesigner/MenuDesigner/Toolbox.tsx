import { useTranslate } from "@rxdrag/react-locales"
import { ResourceItem, defaultMenuResources } from "@rxdrag/react-menu-designer"
import { Collapse, CollapseProps, Tree } from "antd"
import { memo, useMemo } from "react"
import styled from "styled-components"
import { useAppFrontend } from "../../hooks/useAppFrontend"
import { DataNode } from "antd/es/tree"

const { DirectoryTree } = Tree;

const ItemContainer = styled.div`
  position: relative;
  height: 40px;
  box-sizing: border-box;
  width: 100%;
  margin: 8px 0;
  &.dragging{
    opacity: 0.6;
  }
`

const ModuleItemCOntainer = styled.div`
  position: relative;
  height: 40px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  &.dragging{
    opacity: 0.6;
  }

  cursor: move;
`

const StyledCollapse = styled(Collapse)`
  border-radius: 0;
  border: 0;
  user-select: none;
  .ant-collapse-content-box{
    padding: 0 16px !important;
    margin: 0;
  }
  .ant-collapse-item{
    border-radius: 0 !important;
  }
  .ant-collapse-content{
    background-color: transparent;
  }
  .ant-tree{
    background-color: transparent;
    .ant-tree-treenode{
      display: flex;
      .ant-tree-node-content-wrapper{
        display: flex;
        align-items: center;
      }
      .ant-tree-indent-unit{
        width: 16px;
      }
      .ant-tree-title{
        flex:1;
      }
      .ant-tree-switcher{
        display: flex;
        align-items: center;
        width: 12px;
      }
    }
  }
`

export const Toolbox = memo(() => {
  const t = useTranslate()
  const appFront = useAppFrontend()

  const treeData: DataNode[] = useMemo(() => {
    return appFront?.moduleCategories?.map(category => {
      return {
        key: category.id,
        title: category.title,
        children: category.modules?.map(module => {
          return {
            key: module.id,
            title: <ModuleItemCOntainer>
              {module.title}
            </ModuleItemCOntainer>,
            isLeaf: true,
          }
        })
      }
    }) || []
  }, [appFront?.moduleCategories])

  const items: CollapseProps['items'] = useMemo(() => [
    {
      key: 'base',
      label: t("base"),
      children: defaultMenuResources.map((resrouce) => {
        return (<ItemContainer key={resrouce.id}>
          <ResourceItem id={resrouce.id} />
        </ItemContainer>)
      }),
    },
    {
      key: 'modules',
      label: t("modules"),
      children: <DirectoryTree
        selectable={false}
        multiple={false}
        defaultExpandAll
        treeData={treeData}
      />
    },
  ], [t, treeData]);


  return (
    <StyledCollapse
      size="small"
      accordion
      items={items}
      ghost />
  )
})