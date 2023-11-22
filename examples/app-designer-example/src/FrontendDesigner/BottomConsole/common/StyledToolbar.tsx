import styled from "styled-components";

export const StyledToolbar = styled.div`
  display: flex;
  padding: 0 8px;
  height: 40px;
  align-items: center;
  width: 100%;
  border-bottom: solid 1px ${props => props.theme?.token?.colorBorderSecondary};
  box-sizing: border-box;
`;
