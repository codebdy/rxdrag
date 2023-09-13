import { memo, useMemo } from "react";
import { DEFAULT_MARGIN } from "../../utilities";
import styled from 'styled-components';
import { ColumnTitle, FlatableColumn } from "../FlatableColumn";
import { MenuItemType } from "../../interfaces";
import { ResourceItem } from "./ResourceItem";
import { Collapse } from 'antd';
import type { CollapseProps } from 'antd';

const maxWidth = 1000
const minWidth = 200

const StyledCollapse = styled(Collapse)`
  border-radius: 0;
  border: 0;
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

  const items: CollapseProps['items'] = useMemo(() => [
    {
      key: '1',
      label: '基础',
      children: <>
        <ResourceItem name={MenuItemType.group} />
        <ResourceItem name={MenuItemType.link} />
      </>,
    },
    {
      key: '2',
      label: '功能',

    },
  ], []);

  return (
    <ToolboxShell
      maxWidth={maxWidth}
      minWidth={minWidth}
      width={320}
    >
      <ColumnTitle>
        菜单源
      </ColumnTitle>
      <StyledCollapse size="small" accordion items={items} ghost/>
    </ToolboxShell>
  )
})

