import { memo } from "react";
import { DEFAULT_MARGIN } from "../../utilities";
import styled from 'styled-components';
import { FlatableColumn } from "../FlatableColumn";

const maxWidth = 1000
const minWidth = 300

const ToolboxShell = styled(FlatableColumn)`
  left: ${DEFAULT_MARGIN}px;
`

export const Toolbox = memo(() => {
  return (
    <ToolboxShell
      maxWidth={maxWidth}
      minWidth={minWidth}
      width={300}
    >
      哈哈
    </ToolboxShell>
  )
})