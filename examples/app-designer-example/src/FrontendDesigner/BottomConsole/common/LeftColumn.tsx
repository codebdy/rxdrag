import styled from "styled-components";
import { ResizableColumn, floatShadow } from "@rxdrag/react-antd-shell";

export const LeftColumn = styled(ResizableColumn)`
  height: 100%;
  border-right: solid 1px ${props => props.theme.token?.colorBorderSecondary};
  background-color: ${props => props.theme.token?.colorBgBase};
  z-index: 1;
  &.fixed{
    position: absolute;
    right:0;
    left:49px;
    box-shadow: ${floatShadow};
  }

  &.hidden{
    display: none;
  }
`;
