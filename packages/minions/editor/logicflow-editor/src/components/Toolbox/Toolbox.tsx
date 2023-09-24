import styled from "styled-components";
import { ResizableColumn } from "../ResizableColumn";

export const Toolbox = styled(ResizableColumn)`
  user-select: none;
  width: 180px;
  border-right: ${props => props.theme.token?.colorBorder} solid 1px;
  height: 100%;
  display: flex;
  flex-flow: column;
`
