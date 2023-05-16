import { jsx as _jsx } from "react/jsx-runtime";
import { useToken } from "antd/es/theme/internal";
import { memo, useMemo } from "react";
import styled, { ThemeProvider } from "styled-components";
import { useThemeMode } from "@rxdrag/react-core";
const Container = styled.div `
  width: 100%;
  height: 100vh;
  display: flex;
  flex-flow: column;
  background-color: ${props => props.theme.token?.colorBgBase};
`;
export const ShellContainer = memo((props) => {
    const [, token] = useToken();
    const themeMode = useThemeMode();
    const theme = useMemo(() => {
        return {
            token
        };
    }, [token]);
    return (_jsx(ThemeProvider, { theme: theme, children: _jsx(Container, { className: themeMode, children: props.children }) }));
});
