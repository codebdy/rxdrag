import { useTranslate } from "@rxdrag/react-locales"
import { ResourceItem, defaultMenuResources } from "@rxdrag/react-menu-designer"
import { Collapse, CollapseProps } from "antd"
import { memo, useMemo } from "react"
import styled from "styled-components"

const ItemContainer = styled.div`
  position: relative;
  height: 48px;
  box-sizing: border-box;
  width: 100%;
  margin: 8px 0;
  &.dragging{
    opacity: 0.6;
  }
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
`

export const Toolbox = memo(() => {
  const t = useTranslate()

  const items: CollapseProps['items'] = useMemo(() => [
    {
      key: '1',
      label: t("base"),
      children: defaultMenuResources.map((resrouce) => {
        return (<ItemContainer key={resrouce.id}>
          <ResourceItem id={resrouce.id} />
        </ItemContainer>)
      }),
    },
    {
      key: '2',
      label: t("modules"),
    },
  ], [t]);


  return (
    <StyledCollapse
      size="small"
      accordion
      items={items}
      ghost />
  )
})