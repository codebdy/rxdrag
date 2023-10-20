import styled from "styled-components";
import { ResizableColumn } from "../ResizableColumn";

export const FlowToolbox = styled(ResizableColumn)`
  user-select: none;
  width: 180px;
  border-right: ${props => props.theme.token?.colorBorderSecondary} solid 1px;
  height: 100%;
  display: flex;
  flex-flow: column;
  background-color: ${props => props.theme.token?.colorBgBase};
`
