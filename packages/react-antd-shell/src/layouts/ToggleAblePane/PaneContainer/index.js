import { jsx as _jsx } from "react/jsx-runtime";
import { memo } from "react";
import styled from "styled-components";
const Container = styled.div `
  width: 100%;
  flex: 1;
  height: 0;
  display: flex;
  flex-flow: column;
`;
export const PaneContainer = memo((props) => {
    const { children, ...other } = props;
    return _jsx(Container, { ...other, children: children });
});
