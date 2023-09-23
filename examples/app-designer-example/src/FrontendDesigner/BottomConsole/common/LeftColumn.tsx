import styled from "styled-components";
import { ResizableColumn } from "@rxdrag/react-antd-shell";

export const LeftColumn = styled(ResizableColumn)`
  border-right: solid 1px ${props => props.theme.token?.colorBorderSecondary};
`;
