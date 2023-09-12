import { memo } from "react";
import { DEFAULT_MARGIN } from "../../utilities";

import styled from 'styled-components';
import { ColumnTitle, FlatableColumn } from "../FlatableColumn";

const maxWidth = 1000
const minWidth = 200

const PropertyPanelShell = styled(FlatableColumn)`
  right: ${DEFAULT_MARGIN}px;

`
export const PropertyPanel = memo(() => {
  return (
    <PropertyPanelShell
      right
      maxWidth={maxWidth}
      minWidth={minWidth}
      width={320}
    >
      <ColumnTitle>
        属性
      </ColumnTitle>
    </PropertyPanelShell>
  )
})