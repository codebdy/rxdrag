import styled from "styled-components";
import { ResizableColumn } from "@rxdrag/react-antd-shell";

export const LeftColumn = styled(ResizableColumn)`
  height: 100%;
  border-right: solid 1px ${props => props.theme.token?.colorBorderSecondary};
  background-color: ${props => props.theme.token?.colorBgBase};
  z-index: 1;
`;
