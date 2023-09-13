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
      <Collapse accordion items={items} ghost/>
    </ToolboxShell>
  )
})

