import { jsx as _jsx } from "react/jsx-runtime";
import { Layout } from "antd";
import { forwardRef, memo } from "react";
import { useLayoutParams } from "../context";
import { Trigger } from "../Trigger";
const { Sider: AntdSider, } = Layout;
export const Sider = memo(forwardRef((props, ref) => {
    const { hasTrigger, dark = true, children, ...other } = props;
    const { collapsed } = useLayoutParams() || {};
    return (_jsx(AntdSider, { ref: ref, theme: dark ? 'dark' : 'light', trigger: hasTrigger ? _jsx(Trigger, {}) : null, collapsible: true, collapsed: collapsed, ...other, children: children }));
}));
