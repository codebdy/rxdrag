import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ConfigProvider, theme } from "antd";
import { forwardRef, memo } from "react";
import { Trigger } from "../Trigger";
import { HeaderInner } from "./HeaderInner";
export const Header = memo(forwardRef((props, ref) => {
    const { hasTrigger = true, disableTrigger, dark, children, ...other } = props;
    return (_jsx(ConfigProvider, { theme: {
            algorithm: dark ? theme.darkAlgorithm : theme.defaultAlgorithm
        }, children: _jsxs(HeaderInner, { ref: ref, ...other, children: [hasTrigger && _jsx(Trigger, { disable: disableTrigger }), children] }) }));
}));
