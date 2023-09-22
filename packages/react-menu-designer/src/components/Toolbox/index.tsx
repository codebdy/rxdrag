import { memo, useMemo } from "react";
import { DEFAULT_MARGIN } from "../../utilities";
import styled from 'styled-components';
import { ColumnTitle, FloatableColumn } from "../FloatableColumn";
import { Collapse } from 'antd';
import type { CollapseProps } from 'antd';
import { ResourceItem } from "./ResourceItem";
import { useTranslate } from "@rxdrag/react-locales";
import { defaultMenuResources } from "../../resources";

const maxWidth = 1000
const minWidth = 200

const Content = styled.div`
  flex:1;
`
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

const ToolboxShell = styled(FloatableColumn)`
  left: ${DEFAULT_MARGIN}px;
`
export const Toolbox = memo((
  props: {
    children?: React.ReactNode
  }
) => {
  const { children } = props;
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
      label: t("others"),
    },
  ], [t]);

  return (
    <ToolboxShell
      maxWidth={maxWidth}
      minWidth={minWidth}
      width={320}
    >
      <ColumnTitle>
        {t("menuSource")}
      </ColumnTitle>
      <Content >
        {
          children || <StyledCollapse
            size="small"
            accordion
            items={items}
            ghost />
        }
      </Content>
    </ToolboxShell>
  )
})

