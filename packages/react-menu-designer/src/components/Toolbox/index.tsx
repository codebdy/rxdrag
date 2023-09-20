import { memo, useMemo } from "react";
import { DEFAULT_MARGIN } from "../../utilities";
import styled from 'styled-components';
import { ColumnTitle, FlatableColumn } from "../FlatableColumn";
import { Collapse } from 'antd';
import type { CollapseProps } from 'antd';
import { ResourceItem } from "./ResourceItem";
import { MenuItemType } from "../../interfaces";
import { useTranslate } from "@rxdrag/react-locales";

const maxWidth = 1000
const minWidth = 200

const Content = styled.div`
  flex:1;
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

const ToolboxShell = styled(FlatableColumn)`
  left: ${DEFAULT_MARGIN}px;
`
export const Toolbox = memo(() => {
  const t = useTranslate()

  const items: CollapseProps['items'] = useMemo(() => [
    {
      key: '1',
      label: '基础',
      children: <>
        <ResourceItem name={MenuItemType.text} />
        <ResourceItem name={MenuItemType.link} />
        <ResourceItem name={MenuItemType.divider} />
      </>,
    },
    {
      key: '2',
      label: '视图',

    },
  ], []);

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
        <StyledCollapse
          size="small"
          accordion
          items={items}
          ghost />
      </Content>
    </ToolboxShell>
  )
})

