import styled from "styled-components";
import { Button } from "antd";

export const NavButton = styled(Button).attrs({ block: true })`
  height: 36px;
  border-radius: 0;
  box-sizing: border-box;
  border-left: solid 3px transparent;
  border-right: solid 3px transparent;
  &.intermediate{
    border-left-color: ${props => props.theme?.token?.colorPrimary};
  }
  margin-bottom: 2px;
`;
