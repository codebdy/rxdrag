import styled from "styled-components";

export const PropertiesArea = styled.div`
  position: relative;
  margin-left: 8px;
  display: flex;
  flex-flow: column;
  box-sizing: border-box;
  ::before{
    content: "";
    position: absolute;
    left:0;
    top:0;
    height: calc(100% - 16px);
    border-left: dotted 1px ${props => props.theme.token?.colorBorder};
    width: 4px;
    border-bottom: dotted 1px ${props => props.theme.token?.colorBorder};
  }
`;
