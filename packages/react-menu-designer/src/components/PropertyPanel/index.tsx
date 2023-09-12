import { memo } from "react";
import { DEFAULT_MARGIN } from "../../utilities";

import styled from 'styled-components';
import { FlatableColumn } from "../FlatableColumn";

const maxWidth = 1000
const minWidth = 300

const PropertyPanelShell = styled(FlatableColumn)`
  right: ${DEFAULT_MARGIN}px;

`
export const PropertyPanel = memo(() => {
  return (
    <PropertyPanelShell
      right
      maxWidth={maxWidth}
      minWidth={minWidth}
      width={300}
    >
      哈哈
    </PropertyPanelShell>
  )
})