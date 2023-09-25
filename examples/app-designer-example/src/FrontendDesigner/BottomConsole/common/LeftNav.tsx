import styled from "styled-components";

export const LeftNav = styled.div`
  display: flex;
  flex-flow: column;
  width: 32px;
  padding: 8px;
  align-items: center;
  border-right: solid 1px ${props => props.theme.token?.colorBorderSecondary};
`;
