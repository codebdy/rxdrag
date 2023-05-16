import { jsx as _jsx } from "react/jsx-runtime";
import { useThemeMode } from "@rxdrag/react-core";
import { ConfigProvider, theme } from "antd";
import { memo } from "react";
export const ConfigRoot = memo((props) => {
    const themeMode = useThemeMode();
    return (_jsx(ConfigProvider, { theme: {
            algorithm: themeMode === "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm
        }, children: props.children }));
});
