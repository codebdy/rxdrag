import { jsx as _jsx } from "react/jsx-runtime";
import { memo } from "react";
import styled from "styled-components";
import { useTrans } from "../../hooks/useTrans";
const StyledToolbox = styled.div `
  user-select: none;
  width: 180px;
  border-right: ${props => props.theme.token?.colorBorder} solid 1px;
  height: 100%;
  display: flex;
  flex-flow: column;
`;
export const Toolbox = memo((props) => {
    const { children } = props;
    const t = useTrans();
    return (_jsx(StyledToolbox, { children: children }));
});
