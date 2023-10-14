import styled from "styled-components";

export const LeftNav = styled.div`
  display: flex;
  flex-flow: column;
  width: 40px;
  align-items: center;
  border-right: solid 1px ${props => props.theme.token?.colorBorderSecondary};
`;
