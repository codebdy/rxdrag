import { useTranslate } from "@rxdrag/react-locales"
import { IMenuItemResource, ResourceItem } from "@rxdrag/react-menu-designer"
import { Collapse, CollapseProps, Tree } from "antd"
import { memo, useMemo } from "react"
import styled from "styled-components"
import { useAppFrontend } from "../../hooks/useAppFrontend"
import { DataNode } from "antd/es/tree"
import { baseMenuResources } from "./resrouces"
import { IModuleItemConfig, moduleResouceType } from "./types"

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
      .ant-tree-node-content-wrapper {
        height: 40px;
        align-items: center;
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

const ModuleResource = styled(ResourceItem)`
  border: none !important;
  color:${props => props.theme.token?.colorText};
  &.dragging{
    background-color: ${props => props.theme.token?.colorBgContainer};
    border: solid 1px ${props => props.theme.token?.colorBorder} !important;
  }
`

export const Toolbox = memo((
  props: {
    resources: IMenuItemResource[]
  }
) => {
  const { resources } = props
  const t = useTranslate()
  const appFront = useAppFrontend()

  const treeData: DataNode[] = useMemo(() => {
    return appFront?.moduleCategories?.map(category => {
      return {
        key: category.id,
        title: category.title,
        children: category.modules?.map(module => {
          const resource = resources.find
            (res => res.selector?.(
              {
                config: { moduleId: module.id, } as IModuleItemConfig,
                type: moduleResouceType
              }
            ))
          return {
            key: module.id,
            title: resource ? <ModuleItemCOntainer>
              <ModuleResource id={resource.id} />
            </ModuleItemCOntainer> : "not found resource",
            isLeaf: true,
          }
        })
      }
    }) || []
  }, [appFront?.moduleCategories, resources])

  const items: CollapseProps['items'] = useMemo(() => [
    {
      key: 'base',
      label: t("base"),
      children: baseMenuResources.map((resource) => {
        return (<ItemContainer key={resource.id}>
          <ResourceItem id={resource.id} />
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